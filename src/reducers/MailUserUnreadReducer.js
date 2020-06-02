import {
    FETCH_MAIL_UNREAD_USER_REQUEST,
    FETCH_MAIL_UNREAD_USER_SUCCESS,
    FETCH_MAIL_UNREAD_USER_ERROR,
  } from "../actions";
  
  const MailUserUnreadReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_MAIL_UNREAD_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_MAIL_UNREAD_USER_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case FETCH_MAIL_UNREAD_USER_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  export default MailUserUnreadReducer;
  