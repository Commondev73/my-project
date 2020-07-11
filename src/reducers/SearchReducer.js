import {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_ERROR
  } from "../actions";
  
  const SearchReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_SEARCH_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_SEARCH_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_SEARCH_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default SearchReducer;
  