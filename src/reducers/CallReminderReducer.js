import {
  RECEIVE_CALL_REMINDERS,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CALL_REMINDERS:
      return action.callReminders
    default:
      return state
  }
}
