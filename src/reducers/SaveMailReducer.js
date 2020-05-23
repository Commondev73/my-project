import {
  SAVE_MAIL_MESSAGE_REQUEST,
  SAVE_MAIL_MESSAGE_SUCCESS,
  SAVE_MAIL_MESSAGE_ERROR,
} from "../actions";

const SaveMailReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_MAIL_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE_MAIL_MESSAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case SAVE_MAIL_MESSAGE_ERROR:
      return { err: action.err, isLoading: false, data: false };
    default:
      return state;
  }
};
export default SaveMailReducer;
