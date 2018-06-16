export const RECEIVE_COMPANIES_WITH_CONSULTANTS = 'RECEIVE_COMPANIES_WITH_CONSULTANTS'
export const RECEIVE_CUSTOMER_COMPANIES = 'RECEIVE_CUSTOMER_COMPANIES'
export const TOGGLE_CUSTOMER_COMPANY = 'TOGGLE_CUSTOMER_COMPANY'

function receiveCompaniesWithConsultants(json) {
  return {
    type: RECEIVE_COMPANIES_WITH_CONSULTANTS,
    companies: json.results,
    receivedAt: Date.now()
  }
}

function receiveCustomerCompanies(json) {
  return {
    type: RECEIVE_CUSTOMER_COMPANIES,
    companies: json.results,
    receivedAt: Date.now()
  }
}

export function sendToggleCompany(companyId, oldValue) {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`http://192.168.0.11/customer/toggle_company.json`, {
              method: 'GET',
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
}

export function fetchCustomerCompanies() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`http://192.168.0.11/customer/customer_companies.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveCustomerCompanies(json))
            })
    } 
} 

export function fetchCompaniesWithConsultants() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`http://192.168.0.11/customer/companies_with_consultants.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveCompaniesWithConsultants(json))
            })
    } 
} 
