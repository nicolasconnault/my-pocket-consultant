import {
    RECEIVE_CUSTOMER_COMPANIES,
    TOGGLE_CUSTOMER_COMPANY,
    UNDO_TOGGLE_CUSTOMER_COMPANY,
    SELECT_CONSULTANT,
    UNDO_SELECT_CONSULTANT
} from '../actions/constants'

export default (state = {}, action) => {
    switch (action.type) {
        case SELECT_CONSULTANT:
        case UNDO_SELECT_CONSULTANT:


        case UNDO_TOGGLE_CUSTOMER_COMPANY:
        case RECEIVE_CUSTOMER_COMPANIES:
            return action.companies
        case TOGGLE_CUSTOMER_COMPANY:
            let companies = []
            for (index in action.companies) {
                if (action.companies[index].id == action.companyId) {
                    action.companies[index].consultantId = action.consultantId
                }
            }
            return action.companies
        case UNDO_TOGGLE_CUSTOMER_COMPANY:
            companies = []
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
