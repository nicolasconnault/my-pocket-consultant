import { API_URL } from '../config'
import { RECEIVE_NEWS_ITEMS } from './constants'

function receiveNewsItems(json) {
  return {
    type: RECEIVE_NEWS_ITEMS,
    newsItems: json.results,
    receivedAt: Date.now(),
  }
}

export function fetchNewsItems(token, companyId) {
  return dispatch => fetch(`${API_URL}customer/company_news_items.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNewsItems(json))
    })
}
