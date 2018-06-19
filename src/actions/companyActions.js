import {
    RECEIVE_CUSTOMER_COMPANIES,
    TOGGLE_CUSTOMER_COMPANY,
    UNDO_TOGGLE_CUSTOMER_COMPANY
} from './constants'
import { API_URL } from '../config'
import { toggleCompanyError } from './modalActions'

export const toggleCompany = (companies, companyId, oldValue) => async (dispatch) => {
	try {
		dispatch(optimisticToggleCompany(companies, companyId, oldValue));
		await sendToggleCompany(companyId, oldValue, dispatch);
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

function sendToggleCompany(companyId, oldValue, dispatch) {
    return fetch(`${API_URL}toggle_company.json`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
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

export function fetchCustomerCompanies() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`${API_URL}customer_companies.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveCustomerCompanies(json))
            })
    }
} 
