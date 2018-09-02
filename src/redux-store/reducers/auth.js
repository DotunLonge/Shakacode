import { authActions as auth } from "../actions/auth";

const initState = {
  action_type: "",
  action_message: "",
  data: {
    isAdmin: false
  },
  isAuthenticated: ""
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
        action_type: auth.SIGNIN_FAILED,
        action_message: payload.message
      };

    case auth.SIGNUP_IN_PROGRESS:
      return {
        ...state,
        action_type: auth.SIGNUP_IN_PROGRESS
      };

    case auth.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        action_type: auth.SIGNUP_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data,
        isAuthenticated: true
      };

    case auth.SIGNUP_FAILED:
      return {
        ...state,
        action_type: auth.SIGNUP_FAILED,
        action_message: payload.message
      };

    case auth.VERIFY_TOKEN_IN_PROGRESS:
      return {
        ...state,
        action_type: auth.VERIFY_TOKEN_IN_PROGRESS
      };

    case auth.VERIFY_TOKEN_SUCCESSFUL:
      return {
        ...state,
        action_type: auth.VERIFY_TOKEN_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data,
        isAuthenticated: true
      };

    case auth.VERIFY_TOKEN_FAILED:
      return {
        ...state,
        action_type: auth.VERIFY_TOKEN_FAILED,
        action_message: payload.message,
        isAuthenticated: false
      };

    case auth.SIGNOUT:
      return {
        ...initState,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
