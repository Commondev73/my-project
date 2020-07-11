import {
  FETCH_BOOKMARKS_REQUEST,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_ERROR,
} from "../actions";

const BookMarksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case FETCH_BOOKMARKS_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default BookMarksReducer;
