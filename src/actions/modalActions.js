import {
    OPEN_MODAL_MESSAGE
} from './constants'

export const toggleCompanyError = (message, messageType) => {
    return {
        type: OPEN_MODAL_MESSAGE,
        message: message,
        messageType: messageType
    }
}
