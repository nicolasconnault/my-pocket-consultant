import { API_URL } from '../config'
import { RECEIVE_TUTORIALS } from './constants'

function receiveTutorials(json) {
  return {
    type: RECEIVE_TUTORIALS,
    tutorials: json.results,
    receivedAt: Date.now()
  }
}

export function fetchTutorials() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`${API_URL}tutorials.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveTutorials(json))
            })
    }
} 
