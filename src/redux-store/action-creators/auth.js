import { authActions as actions } from "../actions/auth";
import axios from "axios";
import { setToken, clearToken } from "../../helpers/token";

export const signin = (obj, callback) => {
  return dispatch => {
    dispatch({ type: actions.SIGNIN_IN_PROGRESS });
    axios({
      url: process.env.REACT_APP_SIGNIN,
      method: "POST",
      data: obj
    })
      .then(res => {
        setToken("ls", res.data.jwtToken);
        dispatch({
          type: actions.SIGNIN_SUCCESSFUL,
          data: res.data
        });
        callback();
      })
      .catch(res => {
        dispatch({
          type: actions.SIGNIN_FAILED,
          error: res.response.data.error
        });
      });
  };
};

// export const auto_signin = () => {
//   return dispatch => {
//     dispatch({ type: actions.SIGN_IN_IN_PROGRESS });
//     axios({
//       url: process.env.REACT_APP_AUTO_SIGNIN,
//       method: "GET",
//       headers: {
//         authorization: retrieveToken()
//       }
//     })
//       .then(res => {
//         dispatch({
//           type: actions.SIGN_IN_SUCCESSFUL,
//           data: res.data
//         });
//       })
//       .catch(res => {
//         dispatch({
//           type: actions.SIGN_IN_FAILED,
//           error: res.response.data.error
//         });
//       });
//   };
// };

export const signup = obj => {
  return dispatch => {
    dispatch({ type: actions.SIGNUP_IN_PROGRESS });
    axios({
      url: process.env.REACT_APP_SIGNUP,
      method: "POST",
      data: obj
    })
      .then(res => {
        setToken("jwtToken", res.data.jwtToken);
        dispatch({
          type: actions.SIGNUP_SUCCESSFUL,
          data: res.data
        });
      })
      .catch(res => {
        dispatch({
          type: actions.SIGNUP_FAILED,
          error: res.response.data.message
        });
      });
  };
};

export const signout = () => {
  return dispatch => {
    clearToken();
    dispatch({ type: actions.SIGNOUT });
  };
};
