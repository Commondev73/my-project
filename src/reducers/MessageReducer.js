import {
  POST_MAIL_MESSAGE_REQUEST,
  POST_MAIL_MESSAGE_SUCCESS,
  POST_MAIL_MESSAGE_ERROR
} from "../actions"

const MessageReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_MAIL_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case POST_MAIL_MESSAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      }
    case POST_MAIL_MESSAGE_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
}
export default MessageReducer;
