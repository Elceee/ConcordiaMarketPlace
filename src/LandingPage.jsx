import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { connect } from "react-redux";
import "./Card.css";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  loginOnclick = event => {
    event.preventDefault();
    this.setState({ status: "login" });
  };

  sigunpOnclick = event => {
    event.preventDefault();
    this.setState({ status: "signup" });
  };

  render = () => {
    if (this.state.status === "") {
      return (
        <div className="card center">
          <p>Welcome to Alibay!</p>
          <div>New to the site? Create an account here!</div>
          <button onClick={this.sigunpOnclick}>Sign Up</button>
          <div>Already have an account? Log in here!</div>
          <button onClick={this.loginOnclick}>Login</button>
        </div>
      );
    }
    if (this.state.status === "signup") {
      return (
        <div className="card center">
          <Signup />
          <button onClick={this.loginOnclick}>
            Already have an account? Log in Here!
          </button>
        </div>
      );
    }
    if (this.state.status === "login") {
      return (
        <div className="card center">
          <Login />
          <button onClick={this.sigunpOnclick}>
            Already have an account? Log in Here!
          </button>
        </div>
      );
    }
  };
}
