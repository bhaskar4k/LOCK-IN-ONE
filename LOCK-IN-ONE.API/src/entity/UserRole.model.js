import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const userRoleSchema = new mongoose.Schema({
    role_id: {
        type: String,
        required: true,
        unique: true
    },
    role_name: {
        type: String,
        required: true,
        unique: true
    },
    role_description: {
        type: String,
        required: true,
        unique: true
    },
    data_status: {
        type: String,
        enum: Object.values(DATA_STATUS),
        default: DATA_STATUS.ACTIVE
    }
});

const UserRoles = mongoose.model('user-roles', userRoleSchema);

export default UserRoles;