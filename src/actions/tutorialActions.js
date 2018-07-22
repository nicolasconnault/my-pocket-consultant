import { API_URL } from '../config'
import { RECEIVE_TUTORIALS } from './constants'

function receiveTutorials(json) {
  return {
    type: RECEIVE_TUTORIALS,
    tutorials: json.results,
    receivedAt: Date.now(),
  }
}

export default function fetchTutorials(token) {
  return dispatch => fetch(`${API_URL}customer/tutorials.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveTutorials(json))
    })
}
