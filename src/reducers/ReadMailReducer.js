import {
  READ_MAIL_MESSAGE_REQUEST,
  READ_MAIL_MESSAGE_SUCCESS,
  READ_MAIL_MESSAGE_ERROR,
} from "../actions";

const ReadMailReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_MAIL_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case READ_MAIL_MESSAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case READ_MAIL_MESSAGE_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};
export default ReadMailReducer;
