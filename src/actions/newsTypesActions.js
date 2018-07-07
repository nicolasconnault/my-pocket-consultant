import { API_URL } from '../config'
import { RECEIVE_NEWS_TYPES } from './constants'

function receiveNewsTypes(json) {
  return {
    type: RECEIVE_NEWS_TYPES,
    newsTypes: json.results,
    receivedAt: Date.now(),
  }
}

export default function fetchNewsTypes(token) {
  return dispatch => fetch(`${API_URL}news_types.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNewsTypes(json))
    })
}
