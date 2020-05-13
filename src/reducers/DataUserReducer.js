import {
  FETCH_DATA_USER_REQUEST,
  FETCH_DATA_USER_SUCCESS,
  FETCH_DATA_USER_ERROR
} from "../actions";

const DataUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DATA_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case FETCH_DATA_USER_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default DataUserReducer;
