import {
    FETCH_PROVINCE_REQUEST,
    FETCH_PROVINCE_SUCCESS,
    FETCH_PROVINCE_ERROR
  } from "../actions";
  
  const ProvinceReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_PROVINCE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_PROVINCE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        };
      case FETCH_PROVINCE_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default ProvinceReducer;