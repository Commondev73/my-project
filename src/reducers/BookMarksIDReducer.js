import {
    FETCH_BOOKMARKSID_REQUEST,
    FETCH_BOOKMARKSID_SUCCESS,
    FETCH_BOOKMARKSID_ERROR,
  } from "../actions";
  
  const BookMarksIDReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_BOOKMARKSID_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_BOOKMARKSID_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case FETCH_BOOKMARKSID_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default BookMarksIDReducer;
  