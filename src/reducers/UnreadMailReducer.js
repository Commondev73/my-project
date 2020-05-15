import {
    UNREAD_MAIL_MESSAGE_REQUEST,
    UNREAD_MAIL_MESSAGE_SUCCESS,
    UNREAD_MAIL_MESSAGE_ERROR,
  } from "../actions";
  
  const UnreadMailReducer = (state = {}, action) => {
    switch (action.type) {
      case UNREAD_MAIL_MESSAGE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case UNREAD_MAIL_MESSAGE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case UNREAD_MAIL_MESSAGE_ERROR:
        return { err: action.err, isLoading: false , data:false };
      default:
        return state;
    }
  };
  export default UnreadMailReducer;
