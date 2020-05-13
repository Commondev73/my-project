import {
    FETCH_DISTRICET_REQUEST,
    FETCH_DISTRICET_SUCCESS,
    FETCH_DISTRICET_ERROR
  } from "../actions";
  
  const DistrictReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_DISTRICET_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_DISTRICET_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_DISTRICET_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default DistrictReducer;
  