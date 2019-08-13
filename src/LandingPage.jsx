import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./Card.css";
import "./LandingPage.css";

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
        <div className="card center landingPageContainer">
          <h1>Welcome to Alibay!</h1>
          <div className="landingPageContainer">
            <h4>New to the site? Create an account here!</h4>
            <button onClick={this.sigunpOnclick}>Sign Up</button>
          </div>
          <div className="landingPageContainer">
            <h4>Already have an account? Log in here!</h4>
            <button onClick={this.loginOnclick}>Login</button>
          </div>
        </div>
      );
    }
    if (this.state.status === "signup") {
      return (
        <div className="card center landingPageContainer">
          <Signup />
          <div>
            <button onClick={this.loginOnclick}>
              Already have an account? Log in Here!
            </button>
          </div>
        </div>
      );
    }
    if (this.state.status === "login") {
      return (
        <div className="card center landingPageContainer">
          <Login />
          <div>
            <button onClick={this.sigunpOnclick}>
              New to the site? Sign up here!
            </button>
          </div>
        </div>
      );
    }
  };
}
