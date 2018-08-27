import { authActions as auth } from "../actions/auth";

const initState = {
  action_type: "",
  action_message: "",
  data: {
    role: ""
  },
  isAuthenticated: false
};

export default (state = initState, payload) => {
  switch (payload.type) {
    case auth.SIGNIN_IN_PROGRESS:
      return {
        ...state,
        action_type: auth.SIGNIN_IN_PROGRESS
      };

    case auth.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        action_type: auth.SIGNIN_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data,
        isAuthenticated: true
      };

    case auth.SIGNIN_FAILED:
      return {
        ...state,
        action_type: auth.SIGNIN_FAILED
      };

    case auth.SIGNOUT:
      return {
        ...state,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
