import {
  RECEIVE_NEWS_TYPES,
  TOGGLE_NEWS_TYPE,
  UNDO_TOGGLE_NEWS_TYPE,
} from '../actions/constants'

export default (state = {}, action) => {
  let newsTypes = []
  switch (action.type) {
    case RECEIVE_NEWS_TYPES:
      return action.newsTypes
    case TOGGLE_NEWS_TYPE:
    case UNDO_TOGGLE_NEWS_TYPE:
      newsTypes = {}

      Object.entries(state).forEach((entry) => {
        const companyLabel = entry[0]
        const companyNewsTypes = entry[1]

        newsTypes[companyLabel] = []
        companyNewsTypes.forEach((newsType) => {
          const newNewsType = { ...newsType, status: newsType.status }

          if (companyLabel === action.companyLabel
            && newNewsType.id === action.newsTypeId) {
            newNewsType.status = !action.oldValue
          }
          newsTypes[companyLabel].push(newNewsType)
        })
      })

      return newsTypes
    default:
      return state
  }
}
