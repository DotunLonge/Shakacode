let baseUrl;
let productionUrl = "https://shaka-server-jtuabnyqng.now.sh/api/";
let devUrl = "http://localhost:7070/api/";
baseUrl = process.env.REACT_APP_MODE === "production" ? productionUrl : devUrl;

export default {
  SIGNIN: `${baseUrl}user/signin`,
  SIGNUP: `${baseUrl}user/signup`,
  VERIFY: `${baseUrl}user/verify`,
  USERS: `${baseUrl}users`
};
