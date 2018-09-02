export function getQueryString(str) {
  return str.split("?")[1];
}

export function extractMessage(res) {
  let message;
  if (res && res.response) {
    message = res.response.message || res.response.data.message;
  } else {
    message = "Connection Error";
  }
  return message;
}
