import EnumsConstants from '../common-constants/Enum.constant.js';

const { TRUE_FALSE } = EnumsConstants;

class SuccessDTO {
    /**
     * @param {boolean} success - Indicates whether the request was successful
     * @param {string} message - A descriptive message about the response
     * @param {*} [data=null] - Nullable data of any type
     */
    constructor(message = "Request Successful!", data = null) {
        this.success = TRUE_FALSE.TRUE;
        this.message = message;
        this.data = data;
    }
}

export default SuccessDTO;