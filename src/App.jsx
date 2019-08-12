import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import ItemDetails from "./ItemDetails.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";

class UnconnectedApp extends Component {
  renderAllItems = () => {
    return (
      <div>
        <ViewAllItems />
      </div>
    );
  };

  renderItemDetails = rd => {
    let itemId = rd.match.params.itemId;

    return (
      <div>
        <ItemDetails _id={itemId} />
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
          <Route
            exact
            path="/itemdetails/:itemId"
            render={this.renderItemDetails}
          />
        </BrowserRouter>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username, items: state.items };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
