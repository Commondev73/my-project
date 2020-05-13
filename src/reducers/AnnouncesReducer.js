import {
  FETCH_ANNOUNCES_REQUEST,
  FETCH_ANNOUNCES_SUCCESS,
  FETCH_ANNOUNCES_ERROR
} from "../actions";

const AnnouncesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ANNOUNCES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ANNOUNCES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      }
      case FETCH_ANNOUNCES_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default AnnouncesReducer;
