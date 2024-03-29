import React, { Component } from "react";
import { connect } from "react-redux";
import "./FormButton.css";
import "./signup.css";
import { withRouter } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  usernameChangeHandler = event => {
    this.setState({ username: event.target.value });
  };

  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  submitHandler = async event => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/login", { method: "POST", body: data });
    let respsonseBody = await response.text();
    let parsed = JSON.parse(respsonseBody);

    if (!parsed.success) {
      alert("Login failed");
      this.setState({ username: "", password: "" });
      return;
    }

    this.props.dispatch({ type: "login-success", username: username });
  };

  render() {
    return (
      <div className="loginForm">
        <h3>Login</h3>
        <form onSubmit={this.submitHandler}>
          <p>Username</p>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            value={this.state.username}
          />
          <p>Password</p>
          <input
            type="password"
            onChange={this.passwordChangeHandler}
            value={this.state.password}
          />
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

let Login = connect()(withRouter(UnconnectedLogin));

export default Login;
