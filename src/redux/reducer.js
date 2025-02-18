import { LOGIN, LOGOUT, CHANGE_COLOR } from "./actions";

const initialState = {
  user: "",

  color: "",
 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload };
    case LOGOUT:
      return initialState;
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
