import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";

class UnconnectedApp extends Component {
  renderAllItems = () => {
    return (
      <div>
        <ViewAllItems />
      </div>
    );
  };
  render = () => {
    if (this.props.username === undefined) {
      return (
        <div>
          <Login />
          <Signup />
        </div>
      );
    }
    return (
      <div>
        Hey I'm logged in, great.
        <BrowserRouter>
          <Route exact path="/" render={this.renderAllItems} />
        </BrowserRouter>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
