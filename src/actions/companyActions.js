import {
    RECEIVE_CUSTOMER_COMPANIES,
    TOGGLE_CUSTOMER_COMPANY,
    UNDO_TOGGLE_CUSTOMER_COMPANY
} from './constants'
import { AsyncStorage } from 'react-native'
import { API_URL, ACCESS_TOKEN } from '../config'
import { toggleCompanyError } from './modalActions'

export const toggleCompany = (companies, companyId, oldValue) => async (dispatch) => {
	try {
		dispatch(optimisticToggleCompany(companies, companyId, oldValue));
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
		await sendToggleCompany(companyId, oldValue, dispatch, token);
	} catch (e) {
		// undo the state change
		dispatch(undoToggleCompany(companies, companyId, oldValue));
 
		// then display the error
		dispatch(toggleCompanyError(e));
	}
}

export const receiveCustomerCompanies = (json) => {
  return {
    type: RECEIVE_CUSTOMER_COMPANIES,
    companies: json.results,
    receivedAt: Date.now()
  }
}

function optimisticToggleCompany(companies, companyId, oldValue) {
  return {
    type: TOGGLE_CUSTOMER_COMPANY,
    companyId: companyId,
    oldValue: oldValue,
    companies: companies
  }
}

function undoToggleCompany(companies, companyId, oldValue) {
  return {
    type: UNDO_TOGGLE_CUSTOMER_COMPANY,
    companyId: companyId,
    oldValue: !oldValue,
    companies: companies
  }
}

function sendToggleCompany(companyId, oldValue, dispatch, token) {
    return fetch(`${API_URL}toggle_company.json`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: companyId,
            oldValue: oldValue,
          }), 
        })
        .then(res => res.json())
        .then((json) => {
            dispatch(receiveCustomerCompanies(json))
        })
}

export function fetchCustomerCompanies(token) {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`${API_URL}customer_companies.json`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: token
            }) 
          })
          .then(res => res.json())
          .then((json) => {
              dispatch(receiveCustomerCompanies(json))
          })
    }
} 
