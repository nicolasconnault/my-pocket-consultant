import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import {
  fetchSubscribedCompanies,
} from './companyActions'

function sendCreateCustomerNote(customerId, subscriptionId, title, note, dispatch, token) {
  return fetch(`${API_URL}consultant/create_customer_note.json`, {
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
      note,
    }),
  })
}

function createCustomerNoteError(error) {
  return error
}

export const createCustomerNote = (
  customerId,
  subscriptionId,
  title,
  note,
) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendCreateCustomerNote(customerId, subscriptionId, title, note, dispatch, token)
      .then(() => {
        dispatch(fetchSubscribedCompanies(token))
      })
  } catch (e) {
    // then display the error
    dispatch(createCustomerNoteError(e))
  }
}

/**
 * Delete Customer Note
 */
function sendRemoveCustomerNote(customerNoteId, dispatch, token) {
  return fetch(`${API_URL}consultant/remove_customer_note.json`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerNoteId,
    }),
  })
    .then(() => {
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const removeCustomerNote = customerNoteId => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendRemoveCustomerNote(customerNoteId, dispatch, token)
}

/**
 * Update Customer Note
 */
function sendUpdateCustomerNote(customerNoteId, title, note, dispatch, token) {
  return fetch(`${API_URL}consultant/update_customer_note.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerNoteId,
      title,
      note,
    }),
  })
    .then(() => {
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const updateCustomerNote = (customerNoteId, title, note) => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendUpdateCustomerNote(customerNoteId, title, note, dispatch, token)
}
