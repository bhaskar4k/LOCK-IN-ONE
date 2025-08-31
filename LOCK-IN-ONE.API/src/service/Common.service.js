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
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(" ")[1];

        // if (!token) {
        //     return res.status(HttpStatus.UNAUTHORIZED).json(new ErrorDTO("Access denied.<br>No token provided."));
        // }

        const MenusData = await Menus.find({ data_status: DATA_STATUS.ACTIVE });

        let Output = [];
        MenusData.forEach(Menu => {
            Output.push({
                menu_id: Menu.menu_id,
                menu_name: Menu.menu_name,
                menu_route: Menu.menu_route,
                parent_id: Menu.parent_id,
                sequence: Menu.sequence
            });
        });

        Output.sort((a, b) => a.sequence - b.sequence);

        return res.status(HttpStatus.OK).json(new SuccessDTO("Menu fetched!", Output));
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO());
    }
}

export default {
    GetMenu
}