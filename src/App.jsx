import React, { Component } from "react";
import { connect } from "react-redux";
import LandingPage from "./LandingPage.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import ItemDetails from "./ItemDetails.jsx";
import Cart from "./Cart.jsx";
import NavBar from "./NavBar.jsx";
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
  render = () => {
    if (this.props.username === undefined) {
      return <LandingPage />;
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
