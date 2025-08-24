import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const organizationSchema = new mongoose.Schema({
    org_name: {
        type: String,
        required: true
    },
    org_guid: {
        type: String,
        required: true,
        unique: true
    },
    org_email: {
        type: String,
        required: true,
        unique: true
    },
    application_count: {
        type: Number,
        required: true,
    },
    payload_instance_count: {
        type: Number,
        required: true,
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

const Organization = mongoose.model('organizations', organizationSchema);

export default Organization;