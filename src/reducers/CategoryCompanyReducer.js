import {
  RECEIVE_COMPANIES_BY_CATEGORY,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMPANIES_BY_CATEGORY:
      return action.categoryCompanies
    default:
      return state
  }
}
