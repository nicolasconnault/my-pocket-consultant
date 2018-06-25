import {
  OPEN_MODAL_MESSAGE,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL_MESSAGE:
      return action
    default:
      return state
  }
}
