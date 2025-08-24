import EnumsConstants from '../common-constants/Enum.constant.js';

const { TRUE_FALSE } = EnumsConstants;

class ErrorDTO {
    /**
     * @param {boolean} success - Indicates whether the request was successful
     * @param {string} message - A descriptive message about the response
     * @param {*} [data=null] - Nullable data of any type
     */
    constructor(data = null, message = "Failed to process the request!") {
        this.success = TRUE_FALSE.FALSE;
        this.message = message;
        this.data = data;
    }
}

export default ErrorDTO;