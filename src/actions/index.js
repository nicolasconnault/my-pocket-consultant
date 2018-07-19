import { fetchUser } from './authActions'
import changeAppMode from './appModeActions'
import setDeviceSize from './deviceActions'
import fetchTutorials from './tutorialActions'
import { fetchNewsItems } from './newsItemActions'
import {
  receiveCustomerCompanies,
  toggleCompany,
  fetchCustomerCompanies,
} from './companyActions'
import {
  fetchConsultants,
  selectConsultant,
} from './consultantActions'
import {
  toggleNewsType,
  fetchNewsTypes,
} from './newsTypesActions'
import {
  removeNotification,
  fetchNotifications,
} from './notificationActions'

console.log(fetchUser)
export {
  changeAppMode,
  fetchConsultants,
  fetchCustomerCompanies,
  fetchNewsItems,
  fetchNewsTypes,
  fetchNotifications,
  fetchUser,
  fetchTutorials,
  receiveCustomerCompanies,
  removeNotification,
  selectConsultant,
  setDeviceSize,
  toggleCompany,
  toggleNewsType,
}
