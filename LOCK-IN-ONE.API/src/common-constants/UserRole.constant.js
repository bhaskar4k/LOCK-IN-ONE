import EnumConstants from './Enum.constant.js';
const { DATA_STATUS, USER_ROLE, USER_ROLE_ID, USER_ROLE_DESCRIPTION } = EnumConstants;

const UserRolesData = [
    {
        role_id: USER_ROLE_ID.SUPER_ADMIN,
        role_name: USER_ROLE.SUPER_ADMIN,
        role_description: USER_ROLE_DESCRIPTION.SUPER_ADMIN,
        data_status: DATA_STATUS.ACTIVE
    },
    {
        role_id: USER_ROLE_ID.ADMIN,
        role_name: USER_ROLE.ADMIN,
        role_description: USER_ROLE_DESCRIPTION.ADMIN,
        data_status: DATA_STATUS.ACTIVE
    },
    {
        role_id: USER_ROLE_ID.ORGANIZATION_ADMIN,
        role_name: USER_ROLE.ORGANIZATION_ADMIN,
        role_description: USER_ROLE_DESCRIPTION.ORGANIZATION_ADMIN,
        data_status: DATA_STATUS.ACTIVE
    },
    {
        role_id: USER_ROLE_ID.ORGANIZATION_USER,
        role_name: USER_ROLE.ORGANIZATION_USER,
        role_description: USER_ROLE_DESCRIPTION.ORGANIZATION_USER,
        data_status: DATA_STATUS.ACTIVE
    },
    {
        role_id: USER_ROLE_ID.COMMON,
        role_name: USER_ROLE.COMMON,
        role_description: USER_ROLE_DESCRIPTION.COMMON,
        data_status: DATA_STATUS.ACTIVE
    }
];

export default UserRolesData;