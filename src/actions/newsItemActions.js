import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import { RECEIVE_NEWS_ITEMS } from './constants'
import { fetchNewsTypes } from './newsTypesActions'
import { fetchSubscribedCompanies } from './companyActions'

/**
 * FETCH
 */
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

/**
 * CREATE
 */
function sendCreateNewsItem(
  newsTypeId,
  subscriptionId,
  title,
  description,
  startDate,
  endDate,
  active,
  url,
  discountedPrice,
  regularPrice,
  dispatch,
  token,
) {
  return fetch(`${API_URL}consultant/create_news_item.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newsTypeId,
      subscriptionId,
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
    }),
  })
}

function createNewsItemError(error) {
  return error
}

export const createNewsItem = (
  newsTypeId,
  subscriptionId,
  title,
  description,
  startDate,
  endDate,
  active,
  url,
  discountedPrice,
  regularPrice,
) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendCreateNewsItem(
      newsTypeId,
      subscriptionId,
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
    )
      .then(() => {
        dispatch(fetchNewsTypes(token))
        dispatch(fetchSubscribedCompanies(token))
      })
  } catch (e) {
    // then display the error
    dispatch(createNewsItemError(e))
  }
}

/**
 * DELETE
 */
function sendRemoveNewsItem(newsItemId, dispatch, token) {
  return fetch(`${API_URL}consultant/remove_news_item.json`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newsItemId,
    }),
  })
    .then(() => {
      dispatch(fetchNewsTypes(token))
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const removeNewsItem = newsItemId => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendRemoveNewsItem(newsItemId, dispatch, token)
}

/**
 * UPDATE
 */
function sendUpdateNewsItem(
  newsItemId,
  title,
  description,
  startDate,
  endDate,
  active,
  url,
  discountedPrice,
  regularPrice,
  dispatch,
  token,
) {
  return fetch(`${API_URL}consultant/update_news_item.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newsItemId,
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
    }),
  })
    .then(() => {
      dispatch(fetchNewsTypes(token))
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const updateNewsItem = (
  newsItemId,
  title,
  description,
  startDate,
  endDate,
  active,
  url,
  discountedPrice,
  regularPrice,
) => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendUpdateNewsItem(
    newsItemId,
    title,
    description,
    startDate,
    endDate,
    active,
    url,
    discountedPrice,
    regularPrice,
    dispatch,
    token,
  )
}

/**
 * TOGGLE
 */
function sendToggleNewsItem(newsItemId, oldValue, dispatch, token) {
  return fetch(`${API_URL}consultant/toggle_news_item.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newsItemId,
      oldValue,
    }),
  })
    .then(() => {
      dispatch(fetchNewsTypes(token))
      dispatch(fetchSubscribedCompanies(token))
    })
}

export const toggleNewsItem = (newsItemId, oldValue) => async (dispatch) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  await sendToggleNewsItem(newsItemId, oldValue, dispatch, token)
}
