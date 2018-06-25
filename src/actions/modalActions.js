import {
  OPEN_MODAL_MESSAGE,
} from './constants'

const toggleCompanyError = (message, messageType) => ({
  type: OPEN_MODAL_MESSAGE,
  message,
  messageType,
})

export default toggleCompanyError
