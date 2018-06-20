import {
    RECEIVE_TUTORIALS,
} from '../actions/constants'

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TUTORIALS:
            return action.tutorials
            break
        default:
            return state
    }
}
