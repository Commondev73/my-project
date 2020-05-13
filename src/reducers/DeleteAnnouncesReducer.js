import {
  DELETE_ANNOUNCES_REQUEST,
  DELETE_ANNOUNCES_SUCCESS,
  DELETE_ANNOUNCES_ERROR
} from "../actions";

const DeleteAnnouncesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ANNOUNCES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ANNOUNCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirect: true
      };
    case DELETE_ANNOUNCES_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default DeleteAnnouncesReducer;
