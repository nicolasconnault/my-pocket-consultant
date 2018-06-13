import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import ConsultantReducer from './ConsultantReducer';
import SelectedCompanyReducer from './SelectedCompanyReducer';

export default combineReducers({
  companies: CompanyReducer,
  consultants: ConsultantReducer,
  selectedCompanyId: SelectedCompanyReducer,
});
