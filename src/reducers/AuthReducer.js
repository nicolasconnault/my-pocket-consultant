import {
  FETCH_USER,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user
    default:
      return state
  }
}
