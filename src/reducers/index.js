import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import ModalReducer from './ModalReducer';
import ConsultantsReducer from './ConsultantsReducer';
import SelectedAppModeReducer from './SelectedAppModeReducer';
import TutorialsReducer from './TutorialsReducer';

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
  consultants: ConsultantsReducer,
  tutorials: TutorialsReducer,
  modalMessage: ModalReducer,
})
