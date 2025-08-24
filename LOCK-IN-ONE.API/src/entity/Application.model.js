import mongoose from "mongoose";
import EnumsConstants from '../common-constants/Enum.constant.js';

const { DATA_STATUS } = EnumsConstants;

const applicationSchema = new mongoose.Schema({
    org_object_id: {
        type: String,
        required: true
    },
    application_url: {
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

const Application = mongoose.model('applications', applicationSchema);

export default Application;