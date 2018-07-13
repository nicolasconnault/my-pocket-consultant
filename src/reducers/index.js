import { combineReducers } from 'redux'
import CompanyReducer from './CompanyReducer'
import ModalReducer from './ModalReducer'
import ConsultantsReducer from './ConsultantsReducer'
import SelectedAppModeReducer from './SelectedAppModeReducer'
import TutorialsReducer from './TutorialsReducer'
import AuthReducer from './AuthReducer'
import DeviceReducer from './DeviceReducer'
import NewsTypesReducer from './NewsTypesReducer'
import NewsItemsReducer from './NewsItemsReducer'
import NotificationsReducer from './NotificationsReducer'

export default combineReducers({
  appMode: SelectedAppModeReducer,
  companies: CompanyReducer,
  consultants: ConsultantsReducer,
  tutorials: TutorialsReducer,
  modalMessage: ModalReducer,
  user: AuthReducer,
  deviceSize: DeviceReducer,
  newsTypes: NewsTypesReducer,
  newsItems: NewsItemsReducer,
  notifications: NotificationsReducer,
})
