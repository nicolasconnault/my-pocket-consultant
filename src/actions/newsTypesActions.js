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

function optimisticToggleNewsType(companyLabel, companyId, newsTypeId, oldValue) {
  return {
    type: TOGGLE_NEWS_TYPE,
    companyId,
    companyLabel,
    newsTypeId,
    oldValue,
  }
}

function undoToggleNewsType(companyLabel, companyId, newsTypeId, oldValue) {
  return {
    type: UNDO_TOGGLE_NEWS_TYPE,
    companyId,
    companyLabel,
    newsTypeId,
    oldValue: !oldValue,
  }
}

function sendToggleNewsType(companyId, newsTypeId, oldValue, dispatch, token) {
  return fetch(`${API_URL}customer/toggle_user_company_news_type.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId,
      newsTypeId,
      oldValue,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveNewsTypes(json))
    })
}

export const toggleNewsType = (companyLabel, companyId, newsTypeId, oldValue) => async (dispatch) => {
  try {
    dispatch(optimisticToggleNewsType(companyLabel, companyId, newsTypeId, oldValue))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendToggleNewsType(companyId, newsTypeId, oldValue, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoToggleNewsType(companyLabel, companyId, newsTypeId, oldValue))

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
