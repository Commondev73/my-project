import {
    FETCH_MESSAGE_REQUEST,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_ERROR
} from "../actions"

const MessageIDReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MESSAGE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_MESSAGE_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            }
        case FETCH_MESSAGE_ERROR:
            return { err: action.err, isLoading: false };
        default:
            return state;
    }
}
export default MessageIDReducer;
