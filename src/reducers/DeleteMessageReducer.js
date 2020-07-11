import {
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_ERROR
  } from "../actions";
  
  const DeleteMessageReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_MESSAGE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case DELETE_MESSAGE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          redirect: true
        };
      case DELETE_MESSAGE_ERROR:
        return { err: action.err, isLoading: false, redirect: false };
      default:
        return state;
    }
  };
  
  export default DeleteMessageReducer;
  