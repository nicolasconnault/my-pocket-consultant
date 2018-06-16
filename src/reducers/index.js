import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import CustomerCompanyReducer from './CustomerCompanyReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companiesWithConsultants: CompanyReducer,
  customerCompanies: CustomerCompanyReducer,
});
