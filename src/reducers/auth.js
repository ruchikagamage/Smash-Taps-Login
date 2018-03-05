import AuthType from "./../type/index";

var initialState = {
  loginUser: false,
  loginResults: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case AuthType.LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload,
        action: AuthType.LOGIN_USER
      };
    case AuthType.LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: false,
        loginResults: action.payload,
        action: AuthType.LOGIN_SUCCESS
      };
    case AuthType.LOGIN_FAIL:
      return {
        ...state,
        loginUser: false,
        loginResults: action.payload,
        action: AuthType.LOGIN_FAIL
      };
    default:
      return state;
  }
}
