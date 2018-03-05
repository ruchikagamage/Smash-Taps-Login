import React, { Component } from "react";
import { connect } from "react-redux";
import * as Auth from "./../actions";
import AuthType from "./../type";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailErrorMsg: "",
      passwordErrorMsg: "",
      statusMessage: "",
      errorStatus: false
    };
  }

  loginSubmit = () => {
    this.setState({
      emailErrorMsg: "",
      passwordErrorMsg :""

    })
    if (this.validator()) {
      const loginCredentials = {
        email: this.email.value,
        password: this.password.value
      };
      this.props.dispatch(Auth.Login(loginCredentials));
    }
  };

  validator = () => {
    let status = true;
    if (this.email.value.trim() === "" || this.email.value.trim() === null) {
      this.setState({ emailErrorMsg: "Email Address Can not be Empty" });
      status = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email.value.trim())
    ) {
      this.setState({
        emailErrorMsg: "Email Address does not Seems to be Valid"
      });
      status = false;
    }
    if (
      this.password.value.trim() === "" ||
      this.password.value.trim() === null
    ) {
      this.setState({ passwordErrorMsg: "Password can not be Empty" });
      status = false;
    } 
    return status;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.action === AuthType.LOGIN_SUCCESS) {
      this.setState({
        statusMessage: "You Are Successfully Login",
        errorStatus: true,
        passwordErrorMsg : "",
        emailErrorMsg : ""
      });
    }

    if (nextProps.action === AuthType.LOGIN_FAIL) {
      this.setState({
        statusMessage: "Your Email Address" + " " + nextProps.loginResultsResponse.email  +" or Your Password " + nextProps.loginResultsResponse.password + " is Incorrect",
        errorStatus: false
      });
    }
  }

  render() {
    return (
      <div className="app-text">
        <p
          style={
            this.state.errorStatus === true
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {this.state.statusMessage}
        </p>
        <input
          ref={input => (this.email = input)}
          type="email"
          className="form-control"
        />
        <p style={{ color: "red" }}>{this.state.emailErrorMsg}</p>
        <input
          ref={input => (this.password = input)}
          type="password"
          className="form-control"
        />
        <p style={{ color: "red" }}>{this.state.passwordErrorMsg}</p>
        <button onClick={this.loginSubmit}>
          {this.props.loginResponse === true ? "Loading..." : "Login"}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);

  return {
    loginResponse: state.auth.loginUser,
    loginResultsResponse: state.auth.loginResults,
    action: state.auth.action
  };
}
export default connect(mapStateToProps)(Login);
