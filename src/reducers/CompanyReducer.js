//import data from '../CompanyList.json';
//
//
//
import {
    RECEIVE_COMPANIES
} from '../actions/companyActions'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_COMPANIES:
            return action.companies
        default:
            return state
    }
}
