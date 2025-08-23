import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const enumsSchema = new mongoose.Schema({
    enum_name: {
        type: String,
        required: true
    },
    enum_value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    data_status: {
        type: String,
        enum: Object.values(DATA_STATUS),
        default: DATA_STATUS.ACTIVE
    }
});

const Enums = mongoose.model('enums', enumsSchema);

export default Enums;