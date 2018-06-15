export const FETCH_COMPANIES_BEGIN   = 'FETCH_COMPANIES_BEGIN';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

export const fetchCompaniesBegin = () => ({
  type: FETCH_COMPANIES_BEGIN
});

export const fetchCompaniesSuccess = companies => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload: { companies }
});

export const fetchCompaniesError = error => ({
  type: FETCH_COMPANIES_FAILURE,
  payload: { error }
});

export function fetchCompanies() {
  return dispatch => {
    dispatch(fetchCompaniesBegin());

    return fetch("http://192.168.0.11/customer/companies_with_consultants.json")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCompaniesSuccess(json.companies));
        return json.companies;
      })
      .catch(error => dispatch(fetchCompaniesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    console.log(response)
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
