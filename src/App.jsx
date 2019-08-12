import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import ItemDetails from "./ItemDetails.jsx";
import Cart from "./Cart.jsx";
import NavBar from "./NavBar.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";

class UnconnectedApp extends Component {
  renderAllItems = () => {
    return (
      <div>
        <NavBar />
        <ViewAllItems />
        <Link to="/cart">Cart</Link>
      </div>
    );
  };

  renderItemDetails = rd => {
    let itemId = rd.match.params.itemId;

    return (
      <div>
        <NavBar />
        <ItemDetails _id={itemId} />
      </div>
    );
  };

  renderCart = () => {
    return (
      <div>
        <NavBar />
        <Cart />
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
        <NavBar />
        Hey I'm logged in, great.
        <BrowserRouter>
          <Route exact path="/" render={this.renderAllItems} />
          <Route
            exact
            path="/itemdetails/:itemId"
            render={this.renderItemDetails}
          />
          <Route exact path="/cart" render={this.renderCart} />
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
