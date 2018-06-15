import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import ConsultantReducer from './ConsultantReducer';
import SelectedCompanyReducer from './SelectedCompanyReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
  consultants: ConsultantReducer,
  selectedCompanyId: SelectedCompanyReducer,
});
