import {
  FETCH_SEARCH_ANNOUNCES_USER_REQUEST,
  FETCH_SEARCH_ANNOUNCES_USER_SUCCESS,
  FETCH_SEARCH_ANNOUNCES_USER_ERROR,
} from "../actions";

const SearchAnnouncesUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SEARCH_ANNOUNCES_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SEARCH_ANNOUNCES_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case FETCH_SEARCH_ANNOUNCES_USER_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default SearchAnnouncesUserReducer;
