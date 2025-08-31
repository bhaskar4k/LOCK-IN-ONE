import MenusConstants from '../common-constants/Menu.constant.js';
import RoleMenuMapping from '../entity/RoleMenuMapping.model.js';

import EnumsConstants from '../common-constants/Enum.constant.js';
const { USER_ROLE, DATA_STATUS } = EnumsConstants;

const SeedRoleMenuMapping = async () => {
    try {
        console.log("Trying to seed role menu mapping!");

        const count = await RoleMenuMapping.countDocuments();

        if (count > 0) {
            console.log("Role menu mapping already seeded. Skipping!\n");
            return;
        }

        const roleMenuDocs = [];

        for (const menu of MenusConstants) {
            switch (menu.menu_id) {
                case "MENU001":
                    // Map to all roles
                    Object.values(USER_ROLE).forEach(role => {
                        roleMenuDocs.push({
                            menu_id: menu.menu_id,
                            role_id: role,
                            data_status: DATA_STATUS.ACTIVE
                        });
                    });
                    break;

                case "MENU002":
                    // Map to COMMON role
                    roleMenuDocs.push({
                        menu_id: menu.menu_id,
                        role_id: USER_ROLE.COMMON,
                        data_status: DATA_STATUS.ACTIVE
                    });
                    break;

                case "MENU003":
                    // Map to ORGANIZATION_ADMIN 
                    roleMenuDocs.push({
                        menu_id: menu.menu_id,
                        role_id: USER_ROLE.ORGANIZATION_ADMIN,
                        data_status: DATA_STATUS.ACTIVE
                    });
                    break;

                case "MENU004":
                    // Map to COMMON role
                    roleMenuDocs.push({
                        menu_id: menu.menu_id,
                        role_id: USER_ROLE.COMMON,
                        data_status: DATA_STATUS.ACTIVE
                    });
                    break;

                case "MENU005":
                    // Map to SUPER_ADMIN, ADMIN, ORGANIZATION_ADMIN, ORGANIZATION_USER roles
                    [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.ORGANIZATION_ADMIN, USER_ROLE.ORGANIZATION_USER].forEach(role => {
                        roleMenuDocs.push({
                            menu_id: menu.menu_id,
                            role_id: role,
                            data_status: DATA_STATUS.ACTIVE
                        });
                    });
                    break;

                default:
                    break;
            }
        }

        if (roleMenuDocs.length > 0) {
            await RoleMenuMapping.insertMany(roleMenuDocs);
        }

        console.log(`Role menu mapping seeded successfully!\n`);
    } catch (error) {
        console.log("Failed to seed role menu mapping error:", error);
        process.exit(1);
    }
};

export default SeedRoleMenuMapping;