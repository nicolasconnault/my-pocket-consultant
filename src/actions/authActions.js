import { FETCH_USER } from './constants'
import { API_URL } from '../config'

export const receiveUser = (json) => {
  return {
    type: FETCH_USER,
    user: json.results,
    receivedAt: Date.now()
  }
}

export function fetchUser(token) {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`${API_URL}user.json`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
              },
                
            })
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveUser(json))
            })
    }
} 
