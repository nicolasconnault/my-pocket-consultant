import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import CompanyReducer from './CompanyReducer';
import SelectionReducer from './SelectionReducer';
import SelectedCompanyReducer from './SelectedCompanyReducer';

export default combineReducers({
  libraries: LibraryReducer,
  companies: CompanyReducer,
  selectedLibraryId: SelectionReducer,
  selectedCompanyId: SelectedCompanyReducer,
});
