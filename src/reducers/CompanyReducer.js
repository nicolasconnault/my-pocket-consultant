import {
    RECEIVE_COMPANIES_WITH_CONSULTANTS,
} from '../actions/companyActions'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_COMPANIES_WITH_CONSULTANTS:
            return action.companies
        default:
            return state
    }
}
