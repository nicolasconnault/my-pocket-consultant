import {
  RECEIVE_CUSTOMER_COMPANIES,
  TOGGLE_CUSTOMER_COMPANY,
  UNDO_TOGGLE_CUSTOMER_COMPANY,
  SELECT_CONSULTANT,
  UNDO_SELECT_CONSULTANT,
} from '../actions/constants'

export default (state = {}, action) => {
  let companies = []
  switch (action.type) {
    case RECEIVE_CUSTOMER_COMPANIES:
      return action.companies
    case TOGGLE_CUSTOMER_COMPANY:
    case UNDO_TOGGLE_CUSTOMER_COMPANY:
      companies = []
      action.companies.forEach((company) => {
        const newCompany = { ...company, enabled: company.enabled }
        if (newCompany.id === action.companyId) {
          newCompany.enabled = !action.oldValue
        }
        companies.push(newCompany)
      })
      return companies
    case SELECT_CONSULTANT:
      action.companies.forEach((company) => {
        const newCompany = { ...company, consultantId: company.consultantId }
        if (newCompany.id === action.companyId) {
          newCompany.consultantId = action.consultantId
        }
      })
      return action.companies
    case UNDO_SELECT_CONSULTANT:
      action.companies.forEach((company) => {
        const newCompany = { ...company, consultantId: company.consultantId }
        if (newCompany.id === action.companyId) {
          newCompany.consultantId = action.currentConsultantId
        }
      })
      return action.companies
    default:
      return state
  }
}
