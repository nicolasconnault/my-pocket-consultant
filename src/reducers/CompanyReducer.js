import {
    RECEIVE_CUSTOMER_COMPANIES,
    TOGGLE_CUSTOMER_COMPANY,
    UNDO_TOGGLE_CUSTOMER_COMPANY,
    SELECT_CONSULTANT,
    UNDO_SELECT_CONSULTANT
} from '../actions/constants'

export default (state = {}, action) => {
    let companies = []
    switch (action.type) {
        case RECEIVE_CUSTOMER_COMPANIES:
            return action.companies
        case TOGGLE_CUSTOMER_COMPANY:
        case UNDO_TOGGLE_CUSTOMER_COMPANY:
            companies = []
            for (index in action.companies) {
                let new_company = action.companies[index]
                if (action.companies[index].id == action.companyId) {
                    new_company.enabled = !action.oldValue
                }
                companies.push(new_company)
            }
            return companies
        case SELECT_CONSULTANT:
            for (index in action.companies) {
                if (action.companies[index].id == action.companyId) {
                    action.companies[index].consultantId = action.consultantId
                }
            }
            return action.companies
        case UNDO_SELECT_CONSULTANT: 
            for (index in action.companies) {
                if (action.companies[index].id == action.companyId) {
                    action.companies[index].consultantId = action.currentConsultantId
                }
            }
            return action.companies
        default:
            return state
    } 
}
