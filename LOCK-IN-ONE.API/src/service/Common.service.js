import EnumsConstants from '../common-constants/Enum.constant.js';
const { DATA_STATUS } = EnumsConstants;

import HttpStatus from '../common-constants/HttpStatus.constant.js';

import Menus from '../entity/Menu.model.js';
import RoleMenuMappings from '../entity/RoleMenuMapping.model.js';

import SuccessDTO from '../dto-class/SuccessDTO.js';
import ErrorDTO from '../dto-class/ErrorDTO.js';

import dotenv from 'dotenv';
dotenv.config();

const GetMenu = async (req, res) => {
    try {
        const mappings = await RoleMenuMappings.find(
            {
                role_id: req.UserInformation.user_role,
                data_status: DATA_STATUS.ACTIVE
            }
        );

        const menuIds = mappings.map(m => m.menu_id);

        if (menuIds.length === 0) return res.status(HttpStatus.OK).json(new SuccessDTO("Menu fetched!", []));

        const MenusData = await Menus.find(
            {
                menu_id: { $in: menuIds },
                data_status: DATA_STATUS.ACTIVE
            }
        ).sort({ sequence: 1 });

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

        return res.status(HttpStatus.OK).json(new SuccessDTO("Menu fetched!", Output));
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorDTO());
    }
}

export default {
    GetMenu
}