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

  render = () => {
    if (this.state.status === "") {
      return (
        <div>
          <p>Welcome to Alibay!</p>
          <div>New to the site? Create an account here!</div>
          <button onClick={this.SigunpOnclick}>Sign Up</button>
          <div>Already have an account? Log in here!</div>
          <button onClick={this.LoginpOnclick}>Login</button>
        </div>
      );
    }
    if (this.state.status === "signup") {
      return (
        <div className="card center">
          <Signup />
          <button onClick={this.LoginpOnclick}>
            Already have an account? Log in Here!
          </button>
        </div>
      );
    }
    if (this.state.status === "login") {
      return (
        <div className="card center">
          <Login />
          <button onClick={this.SignupOnclick}>
            Already have an account? Log in Here!
          </button>
        </div>
      );
    }
  };
}
