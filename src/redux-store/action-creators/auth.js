import { authActions as actions } from "../actions/auth";
import axios from "axios";
import { saveToken, retrieveToken, clearToken } from "../../helpers/token";
import endpoints from "../../endpoints";
import { extractMessage } from "../../helpers/others";

export const signin = obj => {
  return dispatch => {
    dispatch({ type: actions.SIGNIN_IN_PROGRESS });
    axios({
      url: endpoints.SIGNIN,
      method: "POST",
      data: obj
    })
      .then(res => {
        saveToken("ls", res.data.token);
        dispatch({
          type: actions.SIGNIN_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.SIGNIN_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const verify = () => {
  let token = retrieveToken();
  if (token) {
    return dispatch => {
      dispatch({ type: actions.VERIFY_TOKEN_IN_PROGRESS });
      axios({
        url: endpoints.VERIFY,
        method: "POST",
        headers: {
          authorization: retrieveToken()
        }
      })
        .then(res => {
          dispatch({
            type: actions.VERIFY_TOKEN_SUCCESSFUL,
            data: res.data
          });
        })
        .catch(res => {
          dispatch({
            type: actions.VERIFY_TOKEN_FAILED,
            message: extractMessage(res)
          });
        });
    };
  } else {
    return {
      type: actions.VERIFY_TOKEN_FAILED
    };
  }
};

export const signup = obj => {
  return dispatch => {
    dispatch({ type: actions.SIGNUP_IN_PROGRESS });
    axios({
      url: endpoints.SIGNUP,
      method: "POST",
      data: obj
    })
      .then(res => {
        saveToken("ls", res.data.token);
        dispatch({
          type: actions.SIGNUP_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.SIGNUP_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const signout = () => {
  clearToken();
  return { type: actions.SIGNOUT };
};
