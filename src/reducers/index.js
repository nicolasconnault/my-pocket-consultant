import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import ModalReducer from './ModalReducer';
import ConsultantsReducer from './ConsultantsReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
  consultants: ConsultantsReducer,
  modalMessage: ModalReducer
})
