import { adminActions as admin } from "../actions/admin";

const initState = {
  action_type: "",
  action_message: "",
  data: {}
};

export default (state = initState, payload) => {
  switch (payload.type) {
    case admin.DELETE_USER_IN_PROGRESS:
      return {
        ...state,
        action_type: admin.DELETE_USER_IN_PROGRESS
      };

    case admin.DELETE_USER_SUCCESSFUL:
      return {
        ...state,
        action_type: admin.DELETE_USER_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data
      };

    case admin.DELETE_USER_FAILED:
      return {
        ...state,
        action_type: admin.DELETE_USER_FAILED,
        action_message: payload.message
      };

    case admin.FETCH_USER_IN_PROGRESS:
      return {
        ...state,
        action_type: admin.FETCH_USER_IN_PROGRESS
      };

    case admin.FETCH_USER_SUCCESSFUL:
      return {
        ...state,
        action_type: admin.FETCH_USER_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data
      };

    case admin.FETCH_USER_FAILED:
      return {
        ...state,
        action_type: admin.FETCH_USER_FAILED,
        action_message: payload.message
      };

    case admin.FETCH_USERS_IN_PROGRESS:
      return {
        ...state,
        action_type: admin.FETCH_USERS_IN_PROGRESS
      };

    case admin.FETCH_USERS_SUCCESSFUL:
      return {
        ...state,
        action_type: admin.FETCH_USERS_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data
      };

    case admin.FETCH_USERS_FAILED:
      return {
        ...state,
        action_type: admin.FETCH_USERS_FAILED,
        action_message: payload.message
      };

    case admin.UPDATE_USER_IN_PROGRESS:
      return {
        ...state,
        action_type: admin.UPDATE_USER_IN_PROGRESS
      };

    case admin.UPDATE_USER_SUCCESSFUL:
      return {
        ...state,
        action_type: admin.UPDATE_USER_SUCCESSFUL,
        action_message: payload.message,
        data: payload.data
      };

    case admin.UPDATE_USER_FAILED:
      return {
        ...state,
        action_type: admin.UPDATE_USER_FAILED,
        action_message: payload.message
      };

    default:
      return state;
  }
};
