import { POST_ANNOUNCES_REQUEST, POST_ANNOUNCES_SUCCESS, POST_ANNOUNCES_ERROR } from "../actions";

const PostAnnouncesReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ANNOUNCES_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirect: false
      };
    case POST_ANNOUNCES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        redirect: true
      };
    case POST_ANNOUNCES_ERROR:
      return { err: action.err, isLoading: false, redirect: false };
    default:
      return state;
  }
};

export default PostAnnouncesReducer;