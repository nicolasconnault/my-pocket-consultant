import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import { RECEIVE_CONSULTANTS, SELECT_CONSULTANT, UNDO_SELECT_CONSULTANT } from './constants'
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
  return fetch(`${API_URL}select_consultant.json`, {
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

export function fetchConsultants(token) {
  return dispatch => fetch(`${API_URL}consultants.json`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveConsultants(json))
    })
}
