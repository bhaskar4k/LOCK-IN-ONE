import Organization from '../entity/Organization.model.js';
import Application from '../entity/Application.model.js';
import Payload from '../entity/Payload.model.js';

import EnumsConstants from '../common-constants/Enum.constant.js';
const { USER_ROLE } = EnumsConstants;
import HttpStatus from '../common-constants/HttpStatus.constant.js';

import PasswordEncryption from '../utility/PasswordEncryption.js';
const { encrypt, decrypt } = PasswordEncryption;

import Jwt from '../middleware/Jwt.js';
const { GenerateJwtToken } = Jwt;

import SuccessDTO from '../dto-class/SuccessDTO.js';
import ErrorDTO from '../dto-class/ErrorDTO.js';

import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();

const RegisterOrganization = async (req, res) => {
    try {
        const data = req.body;

        // Check if all required fields are present
        if (!data.org_name || data.org_name.length <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Organization name is required!"));
        }
        if (!data.org_email || data.org_email.length <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Organization email is required!"));
        }
        if (!data.application_count || !Number.isInteger(data.application_count) || data.application_count <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Application count is required!"));
        }
        if (!data.payload_instance_count || !Number.isInteger(data.payload_instance_count) || data.payload_instance_count <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Payload variable count is required!"));
        }
        if (!data.payload_variables || !Array.isArray(data.payload_variables) || data.payload_variables.length <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Token payload variables are required!"));
        }
        if (!data.application_urls || !Array.isArray(data.application_urls) || data.application_urls.length <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Application urls are required!"));
        }
        if (data.application_urls.length !== data.application_count) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Application count and application urls count must be equal!"));
        }
        if (data.payload_variables.length !== data.payload_instance_count) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Token payload instance's count and payload variables count must be equal!"));
        }
        if (!data.org_password || data.org_password.length <= 0) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Organization password is required!"));
        }

        for (let i = 0; i < data.payload_variables.length; i++) {
            if (data.payload_variables[i].length <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Token payload variable's length must be strictly greater than 0!"));
            }
        }

        for (let i = 0; i < data.application_urls.length; i++) {
            if (data.application_urls[i].length <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Application URL's length must be strictly greater than 0!"));
            }
        }


        // Validations
        const OrgExistsEmail = await Organization.findOne({ org_email: data.org_email });
        if (OrgExistsEmail) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("An organization with the same email already exists!"));
        }

        const OrgExistsName = await Organization.findOne({ org_name: data.org_name });
        if (OrgExistsName) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("An organization with the same name already exists!"));
        }

        const SameApplicationUrls = await Application.find({ application_url: { $in: data.application_urls } });
        if (SameApplicationUrls.length > 0) {
            const ExistedApplicationUrls = SameApplicationUrls.map(application => application.application_url);
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("Application URLs are used<br>" + ExistedApplicationUrls.join(", ") + " are already registered!"));
        }

        data.org_password = encrypt(data.org_password);

        const new_org_guid = uuidv4();

        const Obj = new Organization({
            org_name: data.org_name,
            org_guid: new_org_guid,
            org_email: data.org_email,
            org_password: data.org_password,
            user_role: USER_ROLE.ORGANIZATION_ADMIN,
            application_count: data.application_count,
            payload_instance_count: data.payload_instance_count,
        });

        const AckSaveOrg = await Obj.save();

        if (!AckSaveOrg) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO("Failed to register the organization!"));
        }

        const SavedOrg = await Organization.findOne({ org_guid: new_org_guid });

        for (let i = 0; i < data.application_urls.length; i++) {
            const App = new Application({
                org_object_id: SavedOrg._id.toString(),
                application_url: data.application_urls[i],
            });

            const AckSaveApplication = await App.save();
            if (!AckSaveApplication) {
                await Organization.findByIdAndDelete(SavedOrg._id);
                await Application.deleteMany({ org_object_id: SavedOrg._id.toString() });

                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO("Failed to register the application urls!"));
            }
        }

        for (let i = 0; i < data.payload_variables.length; i++) {
            const Pl = new Payload({
                org_object_id: SavedOrg._id.toString(),
                payload_variable: data.payload_variables[i],
            });

            const AckSavePayload = await Pl.save();
            if (!AckSavePayload) {
                await Organization.findByIdAndDelete(SavedOrg._id);
                await Application.deleteMany({ org_object_id: SavedOrg._id.toString() });
                await Payload.deleteMany({ org_object_id: SavedOrg._id.toString() });

                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO("Failed to register the payload variables!"));
            }
        }

        return res.status(HttpStatus.OK).json(new SuccessDTO("Organization has been registered successfully!"));
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO());
    }
}

const Login = async (req, res) => {
    try {
        const data = req.body;

        const OrgExists = await Organization.findOne({ org_email: data.email });
        if (!OrgExists) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("An organization with this email does not exist!"));
        }

        if (decrypt(OrgExists.org_password) !== data.password) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ErrorDTO("You've entered wrond password!"));
        }

        const TokenPayload = {
            org_name: OrgExists.org_name,
            org_email: encrypt(OrgExists.org_email),
            user_role: OrgExists.user_role,
        }

        return res.status(HttpStatus.OK).json(new SuccessDTO("Login is successful!", GenerateJwtToken(TokenPayload)));
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO());
    }
}

export default {
    RegisterOrganization,
    Login
}