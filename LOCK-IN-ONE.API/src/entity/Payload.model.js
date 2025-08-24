import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const payloadSchema = new mongoose.Schema({
    org_object_id: {
        type: String,
        required: true
    },
    payload_variable: {
        type: String,
        required: true
    },
    data_status: {
        type: String,
        enum: Object.values(DATA_STATUS),
        default: DATA_STATUS.ACTIVE
    },
    modified_by: {
        type: String,
        default: null
    },
}, { timestamps: true });

const Payload = mongoose.model('payloads', payloadSchema);

export default Payload;