import {
  RECEIVE_CUSTOMER_COMPANIES,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CUSTOMER_COMPANIES:
      return action.companies
    default:
      return state
  }
}
