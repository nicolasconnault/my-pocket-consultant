import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import {
  RECEIVE_CALL_REMINDERS,
} from './constants'

export const receiveCallReminders = json => ({
  type: RECEIVE_CALL_REMINDERS,
  callReminders: json.results,
  receivedAt: Date.now(),
})

export function fetchCallReminders(token) {
  return dispatch => fetch(`${API_URL}consultants/call_reminders.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: token,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveCallReminders(json))
    })
}

function sendCreateCallReminder(customerId, subscriptionId, title, callDate, dispatch, token) {
  return fetch(`${API_URL}consultant/create_call_reminder.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      subscriptionId,
      title,
      callDate,
    }),
  })
}

function createCallReminderError(error) {
  return error
}

export const createCallReminder = (
  customerId,
  subscriptionId,
  title,
  callDate,
) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendCreateCallReminder(customerId, subscriptionId, title, callDate, dispatch, token)
  } catch (e) {
    // then display the error
    dispatch(createCallReminderError(e))
  }
}
