import {
    FETCH_ANNOUNCE_USER_REQUEST,
    FETCH_ANNOUNCE_USER_SUCCESS,
    FETCH_ANNOUNCE_USER_ERROR
  } from "../actions";
  
  const AnnounceUserReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_ANNOUNCE_USER_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_ANNOUNCE_USER_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_ANNOUNCE_USER_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default AnnounceUserReducer;
  