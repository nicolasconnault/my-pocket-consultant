import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import CompanyReducer from './CompanyReducer';
import ConsultantReducer from './ConsultantReducer';
import SelectionReducer from './SelectionReducer';
import SelectedCompanyReducer from './SelectedCompanyReducer';

export default combineReducers({
  libraries: LibraryReducer,
  companies: CompanyReducer,
  consultants: ConsultantReducer,
  selectedLibraryId: SelectionReducer,
  selectedCompanyId: SelectedCompanyReducer,
});
