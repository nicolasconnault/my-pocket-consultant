import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import {
  RECEIVE_NOTIFICATIONS,
  REMOVE_NOTIFICATION,
  UNDO_REMOVE_NOTIFICATION,
} from './constants'

function receiveNotifications(json) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: json.results,
    receivedAt: Date.now(),
  }
}

function optimisticRemoveNotification(notificationId) {
  return {
    type: REMOVE_NOTIFICATION,
    notificationId,
  }
}

function undoRemoveNotification(notificationId) {
  return {
    type: UNDO_REMOVE_NOTIFICATION,
    notificationId,
  }
}

function sendRemoveNotification(notificationId, dispatch, token) {
  return fetch(`${API_URL}customer/remove_notification.json`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notificationId,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNotifications(json))
    })
}

export const removeNotification = notificationId => async (dispatch) => {
  try {
    dispatch(optimisticRemoveNotification(notificationId))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendRemoveNotification(notificationId, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoRemoveNotification(notificationId))
  }
}

export function fetchNotifications(token) {

  return dispatch => fetch(`${API_URL}customer/notifications.json`, {
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
