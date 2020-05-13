import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR
  } from "../actions";
  
  const UpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        };
      case UPDATE_PROFILE_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default UpdateProfileReducer;
  