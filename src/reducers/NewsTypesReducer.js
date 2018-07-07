import {
  RECEIVE_NEWS_TYPES,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NEWS_TYPES:
      return action.newsTypes
    default:
      return state
  }
}
