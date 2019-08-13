import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import ItemDetails from "./ItemDetails.jsx";
import Cart from "./Cart.jsx";
import NavBar from "./NavBar.jsx";
import SellItem from "./SellItem.jsx";
import CategoryRender from "./CategoryRender.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./Card.css";
import "./DynamicButton.css";
import "./FormButton.css";

class UnconnectedApp extends Component {
  renderAllItems = () => {
    return (
      <div>
        <NavBar />
        <ViewAllItems />
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

  renderCategory = rd => {
    let category = rd.match.params.categoryID;
    return (
      <div>
        <NavBar />
        <CategoryRender category={category} />
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

  renderSellItem = () => {
    return (
      <div>
        <NavBar />
        <SellItem />
      </div>
    );
  };

  render = () => {
    if (this.props.username === undefined) {
      return (
        <div className="card center">
          <Login />
          <Signup />
        </div>
      );
    }
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" render={this.renderAllItems} />
          <Route
            exact
            path="/itemdetails/:itemId"
            render={this.renderItemDetails}
          />
          <Route exact path="/cart" render={this.renderCart} />
          <Route
            exact
            path="/category/:categoryID"
            render={this.renderCategory}
          />
          <Route exact path="/sellitem" render={this.renderSellItem} />
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
