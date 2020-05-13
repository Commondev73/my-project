import {
    UPDATE_PROFILE_IMAGE_REQUEST,
    UPDATE_PROFILE_IMAGE_SUCCESS,
    UPDATE_PROFILE_IMAGE_ERROR
  } from "../actions";
  
  const UpdateProfileImageReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_IMAGE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case UPDATE_PROFILE_IMAGE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        };
      case UPDATE_PROFILE_IMAGE_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default UpdateProfileImageReducer;