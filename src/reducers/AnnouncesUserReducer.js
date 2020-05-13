import {
    FETCH_ANNOUNCES_USER_REQUEST,
    FETCH_ANNOUNCES_USER_SUCCESS,
    FETCH_ANNOUNCES_USER_ERROR
  } from "../actions";
  
  const AnnouncesUserReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_ANNOUNCES_USER_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_ANNOUNCES_USER_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_ANNOUNCES_USER_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default AnnouncesUserReducer;
  