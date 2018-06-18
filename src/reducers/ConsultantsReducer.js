import {
    RECEIVE_CONSULTANTS,
} from '../actions/constants'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CONSULTANTS:
            return action.consultants
        default:
            return state
    }
}
