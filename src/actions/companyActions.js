import { AsyncStorage } from 'react-native'
import {
  RECEIVE_CUSTOMER_COMPANIES,
  TOGGLE_CUSTOMER_COMPANY,
  UNDO_TOGGLE_CUSTOMER_COMPANY,
  RECEIVE_SUBSCRIBED_COMPANIES,
  RECEIVE_COMPANIES_BY_CATEGORY,
} from './constants'
import { API_URL, ACCESS_TOKEN } from '../config'

export const receiveCustomerCompanies = json => ({
  type: RECEIVE_CUSTOMER_COMPANIES,
  companies: json.results,
  receivedAt: Date.now(),
})

export const receiveSubscribedCompanies = json => ({
  type: RECEIVE_SUBSCRIBED_COMPANIES,
  subscriptions: json.results,
  receivedAt: Date.now(),
})

export const receiveCompaniesByCategory = json => ({
  type: RECEIVE_COMPANIES_BY_CATEGORY,
  categoryCompanies: json.results,
  receivedAt: Date.now(),
})

function optimisticToggleCompany(companies, companyId, oldValue) {
  return {
    type: TOGGLE_CUSTOMER_COMPANY,
    companyId,
    oldValue,
    companies,
  }
}

function undoToggleCompany(companies, companyId, oldValue) {
  return {
    type: UNDO_TOGGLE_CUSTOMER_COMPANY,
    companyId,
    oldValue: !oldValue,
    companies,
  }
}

function sendToggleCompany(companyId, oldValue, dispatch, token) {
  return fetch(`${API_URL}customer/toggle_company.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId,
      oldValue,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveCustomerCompanies(json))
    })
}

export const toggleCompany = (companies, companyId, oldValue) => async (dispatch) => {
  try {
    dispatch(optimisticToggleCompany(companies, companyId, oldValue))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendToggleCompany(companyId, oldValue, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoToggleCompany(companies, companyId, oldValue))

    // then display the error
    // dispatch(toggleCompanyError(e))
  }
}

export function fetchCustomerCompanies(token) {
  return dispatch => fetch(`${API_URL}customer/customer_companies.json`, {
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
      dispatch(receiveCustomerCompanies(json))
    })
}

export function fetchSubscribedCompanies(token) {
  return dispatch => fetch(`${API_URL}consultant/subscribed_companies.json`, {
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
      dispatch(receiveSubscribedCompanies(json))
    })
}

export function fetchCompaniesByCategory(token) {
  return dispatch => fetch(`${API_URL}consultant/category_companies.json`, {
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
      dispatch(receiveCompaniesByCategory(json))
    })
}
