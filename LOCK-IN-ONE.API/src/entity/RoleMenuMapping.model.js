import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const roleMenuMappingSchema = new mongoose.Schema({
    menu_id: {
        type: String,
        required: true,
    },
    role_id: {
        type: String,
        required: true,
    },
    data_status: {
        type: String,
        enum: Object.values(DATA_STATUS),
        default: DATA_STATUS.ACTIVE
    }
});

const RoleMenuMappings = mongoose.model('role-menu-mappings', roleMenuMappingSchema);

export default RoleMenuMappings;