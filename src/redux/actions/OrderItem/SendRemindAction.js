
export const SEND_REMIND = 'SEND_REMIND';
export const SEND_REMIND_SUCCESS = 'SEND_REMIND_SUCCESS';
export const SEND_REMIND_ERROR = 'SEND_REMIND_ERROR';

export const sendRemindAction = (info) => {
    return {
        type: SEND_REMIND,
        data: info,
    };
};
