import {
    DELETE_BOOKMARK_REQUEST,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_ERROR,
  } from "../actions";
  
  const DeleteBookMarkReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_BOOKMARK_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case DELETE_BOOKMARK_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case DELETE_BOOKMARK_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default DeleteBookMarkReducer