import {
  RECEIVE_NOTIFICATIONS,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
      return action.notifications
    default:
      return state
  }
}
