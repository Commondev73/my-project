import {
  FETCH_SEARCH_MAIL_REQUEST,
  FETCH_SEARCH_MAIL_SUCCESS,
  FETCH_SEARCH_MAIL_ERROR,
} from "../actions";

const SearchMailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SEARCH_MAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SEARCH_MAIL_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case FETCH_SEARCH_MAIL_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default SearchMailReducer;
