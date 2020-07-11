import {
    ADD_BOOKMARK_REQUEST,
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK_ERROR,
  } from "../actions";
  
  const AddBookMarkReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_BOOKMARK_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case ADD_BOOKMARK_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case ADD_BOOKMARK_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default AddBookMarkReducer;
  