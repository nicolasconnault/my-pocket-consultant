import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import {
  RECEIVE_NEWS_TYPES,
  TOGGLE_NEWS_TYPE,
  UNDO_TOGGLE_NEWS_TYPE,
} from './constants'

function receiveNewsTypes(json) {
  return {
    type: RECEIVE_NEWS_TYPES,
    newsTypes: json.results,
    receivedAt: Date.now(),
  }
}

function optimisticToggleNewsType(companyLabel, subscriptionId, newsTypeId, oldValue) {
  return {
    type: TOGGLE_NEWS_TYPE,
    subscriptionId,
    companyLabel,
    newsTypeId,
    oldValue,
  }
}

function undoToggleNewsType(companyLabel, subscriptionId, newsTypeId, oldValue) {
  return {
    type: UNDO_TOGGLE_NEWS_TYPE,
    subscriptionId,
    companyLabel,
    newsTypeId,
    oldValue: !oldValue,
  }
}

function sendToggleNewsType(subscriptionId, newsTypeId, oldValue, dispatch, token) {
  return fetch(`${API_URL}customer/toggle_user_company_news_type.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriptionId,
      newsTypeId,
      oldValue,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNewsTypes(json))
    })
}

export const toggleNewsType = (companyLabel, subscriptionId, newsTypeId, oldValue) => async (dispatch) => {
  try {
    dispatch(optimisticToggleNewsType(companyLabel, subscriptionId, newsTypeId, oldValue))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendToggleNewsType(subscriptionId, newsTypeId, oldValue, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoToggleNewsType(companyLabel, subscriptionId, newsTypeId, oldValue))

    // then display the error
    // dispatch(toggleCompanyError(e))
  }
}

export function fetchNewsTypes(token) {
  return dispatch => fetch(`${API_URL}customer/news_types.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNewsTypes(json))
    })
}
