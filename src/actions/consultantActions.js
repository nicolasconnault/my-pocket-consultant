import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import {
  RECEIVE_CONSULTANTS,
  SELECT_CONSULTANT,
  UNDO_SELECT_CONSULTANT,
  TOGGLE_CUSTOMER_RECRUIT,
  UNDO_TOGGLE_CUSTOMER_RECRUIT,
  TOGGLE_CUSTOMER_HOST,
  UNDO_TOGGLE_CUSTOMER_HOST,
} from './constants'
import { receiveCustomerCompanies } from './companyActions'

function receiveConsultants(json) {
  return {
    type: RECEIVE_CONSULTANTS,
    consultants: json.results,
    receivedAt: Date.now(),
  }
}

function optimisticSelectConsultant(companies, companyId, consultantId) {
  return {
    type: SELECT_CONSULTANT,
    companyId,
    consultantId,
    companies,
  }
}

function selectConsultantError(error) {
  return error
}

function undoSelectConsultant(companies, companyId, consultantId, currentConsultantId) {
  return {
    type: UNDO_SELECT_CONSULTANT,
    companyId,
    consultantId,
    companies,
    currentConsultantId,
  }
}

function sendSelectConsultant(companyId, consultantId, dispatch, token) {
  return fetch(`${API_URL}customer/select_consultant.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId,
      consultantId,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveCustomerCompanies(json))
    })
}

export const selectConsultant = (
  companies,
  companyId,
  consultantId,
  currentConsultantId,
) => async (dispatch) => {
  try {
    dispatch(optimisticSelectConsultant(companies, companyId, consultantId))

    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendSelectConsultant(companyId, consultantId, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoSelectConsultant(companies, companyId, consultantId, currentConsultantId))

    // then display the error
    dispatch(selectConsultantError(e))
  }
}

export function fetchConsultants(token, companyId) {
  return dispatch => fetch(`${API_URL}customer/consultants.json`, {
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
      dispatch(receiveConsultants(json))
    })
}

/**
 * POTENTIAL HOST
 */
function optimisticToggleCustomerHost(customerId, oldValue) {
  return {
    type: TOGGLE_CUSTOMER_HOST,
    customerId,
    oldValue,
  }
}

function undoToggleCustomerHost(customerId, oldValue) {
  return {
    type: UNDO_TOGGLE_CUSTOMER_HOST,
    customerId,
    oldValue: !oldValue,
  }
}

function sendToggleCustomerHost(customerId, oldValue, dispatch, token) {
  return fetch(`${API_URL}consultant/toggle_customer_host.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      oldValue,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      // Don't refresh the companies at this stage, or the tab navigation will be refreshed,
      // causing a visual glitch
      // dispatch(receiveCustomerCompanies(json))
    })
}

export const toggleCustomerHost = (customerId, oldValue) => async (dispatch) => {
  try {
    dispatch(optimisticToggleCustomerHost(customerId, oldValue))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendToggleCustomerHost(customerId, oldValue, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoToggleCustomerHost(customerId, oldValue))

    // then display the error
    // dispatch(toggleCompanyError(e))
  }
}


/**
 * POTENTIAL RECRUIT
 */
function optimisticToggleCustomerRecruit(customerId, oldValue) {
  return {
    type: TOGGLE_CUSTOMER_RECRUIT,
    customerId,
    oldValue,
  }
}

function undoToggleCustomerRecruit(customerId, oldValue) {
  return {
    type: UNDO_TOGGLE_CUSTOMER_RECRUIT,
    customerId,
    oldValue: !oldValue,
  }
}

function sendToggleCustomerRecruit(customerId, oldValue, dispatch, token) {
  return fetch(`${API_URL}consultant/toggle_customer_recruit.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      oldValue,
    }),
  })
    .then(res => res.json())
    .then((json) => {
      // Don't refresh the companies at this stage, or the tab navigation will be refreshed,
      // causing a visual glitch
      // dispatch(receiveCustomerCompanies(json))
    })
}

export const toggleCustomerRecruit = (customerId, oldValue) => async (dispatch) => {
  try {
    dispatch(optimisticToggleCustomerRecruit(customerId, oldValue))
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    await sendToggleCustomerRecruit(customerId, oldValue, dispatch, token)
  } catch (e) {
    // undo the state change
    dispatch(undoToggleCustomerRecruit(customerId, oldValue))

    // then display the error
    // dispatch(toggleCompanyError(e))
  }
}
