import { API_URL } from '../config'
import { RECEIVE_NOTIFICATIONS } from './constants'

function receiveNotifications(json) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: json.results,
    receivedAt: Date.now(),
  }
}

export default function fetchNotifications(token) {
  return dispatch => fetch(`${API_URL}notifications.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNotifications(json))
    })
}
