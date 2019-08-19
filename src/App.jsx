import React, { Component } from "react";
import { connect } from "react-redux";
import LandingPage from "./LandingPage.jsx";
import ViewAllItems from "./ViewAllItems.jsx";
import ItemDetails from "./ItemDetails.jsx";
import SearchResults from "./SearchResults.jsx";
import Cart from "./Cart.jsx";
import NavBar from "./NavBar.jsx";
import SellItem from "./SellItem.jsx";
import CategoryRender from "./CategoryRender.jsx";
import PurchaseHistory from "./PurchaseHistory.jsx";
import SellerProfile from "./SellerProfile.jsx";
import CustomizeSellerPage from "./CustomizeSellerPage.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Modal from "react-modal";
import "./Card.css";
import "./DynamicButton.css";
import "./FormButton.css";

class UnconnectedApp extends Component {
  componentDidMount = () => {
    let getAllItems = async () => {
      let response = await fetch("/all-items");
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      if (body.success !== false) {
        this.props.dispatch({ type: "updateItems", items: body });
      }
    };
    let isUserLoggedIn = async () => {
      let response = await fetch("/isUserLoggedIn");
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      if (body.success) {
        this.props.dispatch({ type: "login-success", username: body.username });
      }
    };
    getAllItems();
    isUserLoggedIn();
  };

  renderLogin = () => {
    return (
      <div>
        <LandingPage />
      </div>
    );
  };

  renderAllItems = () => {
    if (this.props.query === "") {
      return (
        <div>
          <NavBar />
          <ViewAllItems />
          <Modal
            isOpen={this.props.landingPageOpen}
            style={{ content: { border: "none", background: "none" } }}
          >
            <LandingPage />
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <NavBar />
        <SearchResults />
      </div>
    );
  };

  renderItemDetails = rd => {
    let itemId = rd.match.params.itemId;

    return (
      <div>
        <NavBar />
        <ItemDetails _id={itemId} />
        <Modal
          isOpen={this.props.landingPageOpen}
          style={{ content: { border: "none", background: "none" } }}
        >
          <LandingPage />
        </Modal>
      </div>
    );
  };

  renderCategory = rd => {
    let category = rd.match.params.categoryID;
    return (
      <div>
        <NavBar />
        <CategoryRender category={category} />
        <Modal
          isOpen={this.props.landingPageOpen}
          style={{ content: { border: "none", background: "none" } }}
        >
          <LandingPage />
        </Modal>
      </div>
    );
  };

  renderCart = () => {
    if (this.props.username === undefined) {
      return <LandingPage />;
    }
    return (
      <div>
        <NavBar />
        <Cart />
      </div>
    );
  };

  renderSellItem = () => {
    if (this.props.username === undefined) {
      return <LandingPage />;
    }
    return (
      <div>
        <NavBar />
        <SellItem />
      </div>
    );
  };

  renderCustomizeSellerPage = rd => {
    if (this.props.username === undefined) {
      return <LandingPage />;
    }
    let username = rd.match.params.sellerId;
    return (
      <div>
        <NavBar />
        <CustomizeSellerPage username={username} />
      </div>
    );
  };

  renderSellerProfile = rd => {
    let seller = rd.match.params.sellerId;
    return (
      <div>
        <NavBar />
        <SellerProfile seller={seller} />
      </div>
    );
  };

  renderPurchaseHistory = () => {
    if (this.props.username === undefined) {
      return <LandingPage />;
    }
    return (
      <div>
        <NavBar />
        <PurchaseHistory />
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" render={this.renderAllItems} />
          <Route exact path="/login" render={this.renderLogin} />
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
          <Route
            exact
            path="/purchaseHistory"
            render={this.renderPurchaseHistory}
          />
          <Route
            exact
            path="/sellerpage/:sellerId"
            render={this.renderSellerProfile}
          />
          <Route
            exact
            path="/customizesellerpage/:sellerId"
            render={this.renderCustomizeSellerPage}
          />
        </BrowserRouter>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username,
    items: state.items,
    query: state.query,
    landingPageOpen: state.landingPageOpen
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
