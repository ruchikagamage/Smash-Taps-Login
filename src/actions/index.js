import AuthType from "./../type";

export function Login(loginCredentials) {
  return function(dispatch) {
    dispatch({
      type: AuthType.LOGIN_USER,
      payload: true
    });
    if (
      loginCredentials.email === "smashtaps@gmail.com" &&
      loginCredentials.password === "123"
    ) {
      dispatch({ type: AuthType.LOGIN_SUCCESS, payload: loginCredentials });
    } else {
      dispatch({ type: AuthType.LOGIN_FAIL, payload: loginCredentials });
    }
  };
}
