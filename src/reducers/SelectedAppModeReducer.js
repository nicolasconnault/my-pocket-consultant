import { SELECT_APP_MODE } from '../actions/constants'
export default (state = null, action) => {
  switch (action.type) {
    case SELECT_APP_MODE:
       return action.mode
    default:
      return state;
  }
};
