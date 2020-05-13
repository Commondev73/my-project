import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "../actions";

const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirect: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirect: true
      };
    case LOGIN_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default LoginReducer;
