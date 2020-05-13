import {
    FETCH_DRAFT_ANNOUNCES_USER_REQUEST,
    FETCH_DRAFT_ANNOUNCES_USER_SUCCESS,
    FETCH_DRAFT_ANNOUNCES_USER_ERROR
  } from "../actions";
  
  const DraftAnnouncesUserReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_DRAFT_ANNOUNCES_USER_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_DRAFT_ANNOUNCES_USER_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_DRAFT_ANNOUNCES_USER_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default DraftAnnouncesUserReducer;
  