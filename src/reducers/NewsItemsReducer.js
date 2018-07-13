import {
  RECEIVE_NEWS_ITEMS,
} from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NEWS_ITEMS:
      return action.newsItems
    default:
      return state
  }
}
