import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import ModalReducer from './ModalReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
  modalMessage: ModalReducer
})
