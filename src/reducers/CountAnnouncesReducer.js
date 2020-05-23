import {
    FETCH_COUNT_ANNOUNCES_REQUEST,
    FETCH_COUNT_ANNOUNCES_SUCCESS,
    FETCH_COUNT_ANNOUNCES_ERROR,
  } from "../actions";
  
  const CountAnnouncesReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_COUNT_ANNOUNCES_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_COUNT_ANNOUNCES_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        };
      case FETCH_COUNT_ANNOUNCES_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  export default CountAnnouncesReducer;
