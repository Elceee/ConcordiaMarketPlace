import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./Card.css";
import "./LandingPage.css";

class UnconnectedLandingPage extends Component {
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

  closeModal = () => {
    this.props.dispatch({ type: "closeModal" });
  };
  render = () => {
    if (this.state.status === "") {
      return (
        <div className="card center landingPageContainer">
          <div>
            <h1>Welcome to Alibay!</h1>
            <button onClick={this.closeModal} id="close" data-dismiss="modal">
              &times;
            </button>
          </div>
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
          <button onClick={this.closeModal} id="close" data-dismiss="modal">
            &times;
          </button>
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
          <button onClick={this.closeModal} id="close" data-dismiss="modal">
            &times;
          </button>
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

let LandingPage = connect()(UnconnectedLandingPage);

export default LandingPage;
