export enum ResponseType {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    INFO = 'INFO',
    ERROR = 'ERROR'
};

export const ResponseTypeDescriptions: Record<ResponseType, string> = {
    [ResponseType.SUCCESS]: 'Success',
    [ResponseType.WARNING]: 'Warning',
    [ResponseType.INFO]: 'Alert',
    [ResponseType.ERROR]: 'Error',
};