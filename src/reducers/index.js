import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
});
