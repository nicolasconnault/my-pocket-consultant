import {NavigationActions} from 'react-navigation';
import { API_URL } from '../config'
import {navigatorRef} from '../App';
import {
    RECEIVE_CONSULTANTS,
    SELECT_CONSULTANT,
    UNDO_SELECT_CONSULTANT
} from './constants'
import { receiveCustomerCompanies } from './companyActions'

export const selectConsultant = (companies, companyId, consultantId, currentConsultantId) => async (dispatch) => {
	try {
		dispatch(optimisticSelectConsultant(companies, companyId, consultantId));
        navigatorRef.dispatch(NavigationActions.navigate({routeName: 'MyConsultants'}));
		await sendSelectConsultant(companyId, consultantId, dispatch);
	} catch (e) {
		// undo the state change
		dispatch(undoSelectConsultant(companies, companyId, consultantId, currentConsultantId));
 
		// then display the error
		dispatch(selectConsultantError(e));
	}
}

function receiveConsultants(json) {
  return {
    type: RECEIVE_CONSULTANTS,
    consultants: json.results,
    receivedAt: Date.now()
  }
}

function optimisticSelectConsultant(companies, companyId, consultantId) {
  return {
    type: SELECT_CONSULTANT,
    companyId: companyId,
    consultantId: consultantId,
    companies: companies
  }
}

function undoSelectConsultant(companies, companyId, consultantId, currentConsultantId) {
  return {
    type: UNDO_SELECT_CONSULTANT,
    companyId: companyId,
    consultantId: consultantId,
    companies: companies,
    currentConsultantId: currentConsultantId
  }
}

function sendSelectConsultant(companyId, consultantId, dispatch) {
    return fetch(`${API_URL}select_consultant.json`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: companyId,
            consultantId: consultantId,
          }), 
    })
        .then(res => res.json())
        .then((json) => {
            dispatch(receiveCustomerCompanies(json))
        })
}

export function fetchConsultants() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`${API_URL}consultants.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveConsultants(json))
            })
    }
} 
