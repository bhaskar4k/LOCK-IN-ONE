import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const menusSchema = new mongoose.Schema({
    menu_name: {
        type: String,
        required: true
    },
    menu_route: {
        type: String,
        required: true
    },
    menu_id: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
    data_status: {
        type: String,
        enum: Object.values(DATA_STATUS),
        default: DATA_STATUS.ACTIVE
    }
});

const Menus = mongoose.model('menus', menusSchema);

export default Menus;