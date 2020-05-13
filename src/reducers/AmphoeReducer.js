import {
    FETCH_AMPHOE_REQUEST,
    FETCH_AMPHOE_SUCCESS,
    FETCH_AMPHOE_ERROR
  } from "../actions";
  
  const AmphoeReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_AMPHOE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_AMPHOE_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
        case FETCH_AMPHOE_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default AmphoeReducer;
  