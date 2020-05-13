import { SET_CURRENT_USER } from "../actions";
const initialState = {
  authenticated: false
};
const CurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        authenticated: action.user ? true : false,
        id: action.user.id,
        email: action.user.email,
        first_name: action.user.first_name,
        image: action.user.image,
        role: action.user.role
      };
    default:
      return state;
  }
};

export default CurrentUserReducer;
