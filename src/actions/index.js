export const selectCompany = (companyId) => {
  return {
    type: 'select_company',
    payload: companyId
  };
};
