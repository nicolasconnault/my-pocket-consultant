export const selectLibrary = (libraryId) => {
  return {
    type: 'select_library',
    payload: libraryId
  };
};
export const selectCompany = (companyId) => {
  return {
    type: 'select_company',
    payload: companyId
  };
};
