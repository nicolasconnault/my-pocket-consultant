import {
    RECEIVE_CUSTOMER_COMPANIES,
    TOGGLE_CUSTOMER_COMPANY,
    UNDO_TOGGLE_CUSTOMER_COMPANY
} from '../actions/constants'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CUSTOMER_COMPANIES:
            return action.companies
        case TOGGLE_CUSTOMER_COMPANY:
        case UNDO_TOGGLE_CUSTOMER_COMPANY:
            let companies = []
            for (index in action.companies) {
                let new_company = action.companies[index]
                if (action.companies[index].id == action.companyId) {
                    new_company.enabled = !action.oldValue
                }
                companies.push(new_company)
            }
            return companies
        default:
            return state
    }
}
