import Organization from '../entity/Organization.model.js';
import Application from '../entity/Application.model.js';
import Payload from '../entity/Payload.model.js';

import PasswordEncryption from '../utility/PasswordEncryption.js';
const { encrypt } = PasswordEncryption;

import EnumsConstants from '../common-constants/Enum.constant.js';
const { USER_ROLE } = EnumsConstants;

import dotenv from 'dotenv';
dotenv.config();

const SeedUser = async () => {
    try {
        console.log("Trying to seed user!");

        const Exists = await Organization.findOne({ org_guid: process.env.DEFAULT_ORGANIZATION_GUID });

        if (Exists) {
            console.log("User already seeded. Skipping!\n");
            return;
        }

        const Obj = new Organization({
            org_name: process.env.DEFAULT_ORGANIZATION_NAME,
            org_guid: process.env.DEFAULT_ORGANIZATION_GUID,
            org_email: process.env.DEFAULT_ORGANIZATION_EMAIL,
            org_password: encrypt(process.env.DEFAULT_ORGANIZATION_PASSWORD),
            user_role: USER_ROLE.ORGANIZATION_ADMIN,
            application_count: process.env.DEFAULT_ORGANIZATION_APPLICATION_COUNT,
            payload_instance_count: process.env.DEFAULT_ORGANIZATION_PAYLOAD_INSTANCE_COUNT,
        });

        const AckSaveOrg = await Obj.save();

        if (!AckSaveOrg) {
            console.log("Failed to seed user!\n");
            return;
        }

        const SavedOrg = await Organization.findOne({ org_guid: process.env.DEFAULT_ORGANIZATION_GUID });

        const DEFAULT_ORGANIZATION_APPLICATION_URLS = process.env.DEFAULT_ORGANIZATION_APPLICATION_URLS
            ? process.env.DEFAULT_ORGANIZATION_APPLICATION_URLS.split(",").map(v => v.trim())
            : [];

        for (let i = 0; i < DEFAULT_ORGANIZATION_APPLICATION_URLS.length; i++) {
            const App = new Application({
                org_object_id: SavedOrg._id.toString(),
                application_url: DEFAULT_ORGANIZATION_APPLICATION_URLS[i],
            });

            const AckSaveApplication = await App.save();
            if (!AckSaveApplication) {
                await Organization.findByIdAndDelete(SavedOrg._id);
                await Application.deleteMany({ org_object_id: SavedOrg._id.toString() });

                console.log("Failed to seed user!\n");
                return;
            }
        }

        const DEFAULT_ORGANIZATION_PAYLOAD_VARIABLES = process.env.DEFAULT_ORGANIZATION_PAYLOAD_VARIABLES
            ? process.env.DEFAULT_ORGANIZATION_PAYLOAD_VARIABLES.split(",").map(v => v.trim())
            : [];

        for (let i = 0; i < DEFAULT_ORGANIZATION_PAYLOAD_VARIABLES.length; i++) {
            const Pl = new Payload({
                org_object_id: SavedOrg._id.toString(),
                payload_variable: DEFAULT_ORGANIZATION_PAYLOAD_VARIABLES[i],
            });

            const AckSavePayload = await Pl.save();
            if (!AckSavePayload) {
                await Organization.findByIdAndDelete(SavedOrg._id);
                await Application.deleteMany({ org_object_id: SavedOrg._id.toString() });
                await Payload.deleteMany({ org_object_id: SavedOrg._id.toString() });

                console.log("Failed to seed user!\n");
                return;
            }
        }

        console.log(`User seeded successfully!\n`);
    } catch (error) {
        console.log("Failed to seed user error:", error);
        process.exit(1);
    }
};

export default SeedUser;