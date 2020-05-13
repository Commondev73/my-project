import { UPDATE_ANNOUNCES_REQUEST, UPDATE_ANNOUNCES_SUCCESS, UPDATE_ANNOUNCES_ERROR } from "../actions";

const UpdateAnnouncesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ANNOUNCES_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirect: false
      };
    case UPDATE_ANNOUNCES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        redirect: true
      };
    case UPDATE_ANNOUNCES_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default UpdateAnnouncesReducer;