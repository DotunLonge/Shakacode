import { adminActions as actions } from "../actions/admin";
import axios from "axios";
import { retrieveToken } from "../../helpers/token";
import endpoints from "../../endpoints";
import { extractMessage } from "../../helpers/others";

export const fetchUsers = (query = "") => {
  return dispatch => {
    dispatch({ type: actions.FETCH_USERS_IN_PROGRESS });
    let url = endpoints.USERS + "?" + query;
    axios({
      url,
      method: "GET",
      headers: {
        authorization: retrieveToken()
      }
    })
      .then(res => {
        dispatch({
          type: actions.FETCH_USERS_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.FETCH_USERS_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const fetchUser = (id, query = "") => {
  return dispatch => {
    dispatch({ type: actions.FETCH_USER_IN_PROGRESS });
    let url = endpoints.USERS + "/" + id + "?" + query;

    axios({
      url,
      method: "GET",
      headers: {
        authorization: retrieveToken()
      }
    })
      .then(res => {
        dispatch({
          type: actions.FETCH_USER_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.FETCH_USER_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const deleteUser = id => {
  return dispatch => {
    dispatch({ type: actions.DELETE_USER_IN_PROGRESS });
    axios({
      url: endpoints.USERS + "/" + id,
      method: "DELETE",
      headers: {
        authorization: retrieveToken()
      }
    })
      .then(res => {
        dispatch({
          type: actions.DELETE_USER_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.DELETE_USER_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const updateUser = (obj, id) => {
  return dispatch => {
    dispatch({ type: actions.UPDATE_USER_IN_PROGRESS });
    axios({
      url: endpoints.USERS + "/" + id,
      method: "PUT",
      data: obj,
      headers: {
        authorization: retrieveToken()
      }
    })
      .then(res => {
        dispatch({
          type: actions.UPDATE_USER_SUCCESSFUL,
          data: res.data
        });
      })

      .catch(res => {
        dispatch({
          type: actions.UPDATE_USER_FAILED,
          message: extractMessage(res)
        });
      });
  };
};
