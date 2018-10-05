import { AsyncStorage } from 'react-native'
import { FETCH_USER } from './constants'
import { API_URL, ACCESS_TOKEN } from '../config'

export const receiveUser = json => ({
  type: FETCH_USER,
  user: json.results,
  receivedAt: Date.now(),
})

export function fetchUser(token) {
  return dispatch => fetch(`${API_URL}customer/user.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 401) {
        // Token expired, delete it
        AsyncStorage.removeItem(ACCESS_TOKEN)
        return { message: 'TOKEN_EXPIRED' }
      } else {
        return res.json()
      }
    })
    .then((json) => {
      dispatch(receiveUser(json))
    })
}
