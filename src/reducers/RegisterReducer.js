import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_ERROR
} from "../actions";

const RegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirect: false
      };
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        redirect: true
      };
    case POST_REGISTER_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default RegisterReducer;
