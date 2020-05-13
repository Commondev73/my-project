import {
  FETCH_MAIL_REQUEST,
  FETCH_MAIL_SUCCESS,
  FETCH_MAIL_ERROR,
} from "../actions";

const MailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MAIL_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case FETCH_MAIL_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};
export default MailReducer;
