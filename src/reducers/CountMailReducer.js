import {
    COUNT_MAIL_MESSAGE_REQUEST,
    COUNT_MAIL_MESSAGE_SUCCESS,
    COUNT_MAIL_MESSAGE_ERROR,
  } from "../actions";
  
  const CountMailReducer = (state = {}, action) => {
    switch (action.type) {
      case COUNT_MAIL_MESSAGE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case COUNT_MAIL_MESSAGE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case COUNT_MAIL_MESSAGE_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  export default CountMailReducer;
