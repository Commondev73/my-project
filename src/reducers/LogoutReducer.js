import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from "../actions";

const LogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirect: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirect: true
      };
    case LOGOUT_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default LogoutReducer;