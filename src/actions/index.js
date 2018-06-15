export const selectCompany = (companyId) => {
  return {
    type: 'select_company',
    payload: companyId
  };
};
export const selectAppMode = (appMode) => {
  return {
    type: 'select_app_mode',
    payload: appMode
  };
};
