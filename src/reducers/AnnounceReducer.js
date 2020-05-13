import {
  FETCH_ANNOUNCE_REQUEST,
  FETCH_ANNOUNCE_SUCCESS,
  FETCH_ANNOUNCE_ERROR
} from "../actions";

const AnnounceReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ANNOUNCE_REQUEST:
      return {
        ...state,
        [action.id]: { ...state[action.id], isLoading: true }
      };
    case FETCH_ANNOUNCE_SUCCESS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          data: action.data,
          isLoading: false
        }
      };
    case FETCH_ANNOUNCE_ERROR:
      return { ...state, [action.id]: { err: action.err, isLoading: false } };
    default:
      return state;
  }
};

export default AnnounceReducer;
