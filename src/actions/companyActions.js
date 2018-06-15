export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES'

function receiveCompanies(json) {
  return {
    type: RECEIVE_COMPANIES,
    companies: json.results,
    receivedAt: Date.now()
  }
}

export function fetchCompanies() {
    return (dispatch, getState) => {
        const state = getState();

        return fetch(`http://192.168.0.11/customer/companies_with_consultants.json`)
            .then(res => res.json())
            .then((json) => {
                dispatch(receiveCompanies(json))
            })
    } 
} 
