import EnumConstants from './Enum.constant.js';
const { DATA_STATUS } = EnumConstants;

const MenusData = [
  {
    menu_name: "Home",
    menu_route: "home",
    menu_id: "MENU001",
    parent_id: "ROOT",
    sequence: 1,
    data_status: DATA_STATUS.ACTIVE
  },
  {
    menu_name: "Register",
    menu_route: "organization/register",
    menu_id: "MENU002",
    parent_id: "ROOT",
    sequence: 2,
    data_status: DATA_STATUS.ACTIVE
  },
  {
    menu_name: "Manage",
    menu_route: "organization/manage",
    menu_id: "MENU003",
    parent_id: "ROOT",
    sequence: 3,
    data_status: DATA_STATUS.ACTIVE
  },
  {
    menu_name: "Login",
    menu_route: "login",
    menu_id: "MENU004",
    parent_id: "ROOT",
    sequence: 4,
    data_status: DATA_STATUS.ACTIVE
  },
];

export default MenusData;