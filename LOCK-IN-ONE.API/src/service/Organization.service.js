import Organization from '../entity/Organization.model.js';
import Application from '../entity/Application.model.js';
import Payload from '../entity/Payload.model.js';

import EnumsConstants from '../common-constants/Enum.constant.js';
import HttpStatus from '../common-constants/HttpStatus.constant.js';

import SuccessDTO from '../dto-class/SuccessDTO.js';
import ErrorDTO from '../dto-class/ErrorDTO.js';

const RegisterOrganization = async (req, res) => {
    try {
        const obj = {
            name: "HI",
            guid: "HI2",
        }
        res.status(HttpStatus.OK).json(new SuccessDTO(obj));
    } catch (error) {
        
    }
}

export default {
    RegisterOrganization
}