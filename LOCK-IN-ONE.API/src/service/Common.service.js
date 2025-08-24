import EnumsConstants from '../common-constants/Enum.constant.js';
const { DATA_STATUS } = EnumsConstants;

import HttpStatus from '../common-constants/HttpStatus.constant.js';

import Menus from '../entity/Menu.model.js';

import SuccessDTO from '../dto-class/SuccessDTO.js';
import ErrorDTO from '../dto-class/ErrorDTO.js';

import dotenv from 'dotenv';
dotenv.config();

const GetMenu = async (req, res) => {
    try {
        const MenusData = await Menus.find({ data_status: DATA_STATUS.ACTIVE });

        return res.status(HttpStatus.OK).json(new SuccessDTO("Menu fetched!", MenusData));
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO());
    }
}

export default {
    GetMenu
}