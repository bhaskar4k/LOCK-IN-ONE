import mongoose from "mongoose";

const enumsSchema = new mongoose.Schema({
    enum_name: {
        type: String,
        required: true
    },
    enum_value: {
        type: String,
        required: true,
    },
    // data_status: {
    //     type: String,
    //     enum: Object.values(ENUMS.DATA_STATUS),
    //     default: ENUMS.DATA_STATUS.ACTIVE,
    // }
  });

const Enums =  mongoose.model('enums', enumsSchema);

export default Enums;