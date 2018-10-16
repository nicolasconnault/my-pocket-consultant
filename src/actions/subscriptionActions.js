import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import { fetchSubscribedCompanies } from './companyActions'

/**
 * CREATE
 */
function sendCreateSubscription(
  companyId,
  websiteUrl,
  facebookUrl,
  twitterUrl,
  dispatch,
  token,
) {
  return fetch(`${API_URL}consultant/create_subscription.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId,
      websiteUrl,
      facebookUrl,
      twitterUrl,
    }),
  })
}

function createSubscriptionError(error) {
  return error
}

export const createSubscription = (
  companyId,
  websiteUrl,
  facebookUrl,
  twitterUrl,
) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendCreateSubscription(
      companyId,
      websiteUrl,
      facebookUrl,
      twitterUrl,
      dispatch,
      token,
    )
      .then(() => {
        dispatch(fetchSubscribedCompanies(token))
      })
  } catch (e) {
    // then display the error
    dispatch(createSubscriptionError(e))
  }
}

/**
 * DEACTIVATE
 */
function sendDeactivateSubscription(subscriptionId, dispatch, token) {
  return fetch(`${API_URL}consultant/deactivate_subscription.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriptionId,
    }),
  })
    .then(() => {
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const deactivateSubscription = subscriptionId => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendDeactivateSubscription(subscriptionId, dispatch, token)
}

/**
 * DELETE
 */
function sendRemoveSubscription(subscriptionId, dispatch, token) {
  return fetch(`${API_URL}consultant/remove_subscription.json`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriptionId,
    }),
  })
    .then(() => {
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const removeSubscription = subscriptionId => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendRemoveSubscription(subscriptionId, dispatch, token)
}

/**
 * UPDATE
 */
function sendUpdateSubscription(
  subscriptionId,
  websiteUrl,
  facebookUrl,
  twitterUrl,
  dispatch,
  token,
) {
  return fetch(`${API_URL}consultant/update_subscription.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriptionId,
      websiteUrl,
      facebookUrl,
      twitterUrl,
    }),
  })
    .then(() => {
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const updateSubscription = (
  subscriptionId,
  websiteUrl,
  facebookUrl,
  twitterUrl,
) => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendUpdateSubscription(
    subscriptionId,
    websiteUrl,
    facebookUrl,
    twitterUrl,
    dispatch,
    token,
  )
}
