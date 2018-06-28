import { SET_DEVICE_SIZE } from '../actions/constants'

export default (state = null, action) => {
  switch (action.type) {
    case SET_DEVICE_SIZE:
      return action.deviceSize
    default:
      return state
  }
}
