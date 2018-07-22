import {
  RECEIVE_SUBSCRIBED_COMPANIES,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SUBSCRIBED_COMPANIES:
      return action.subscriptions
    default:
      return state
  }
}
