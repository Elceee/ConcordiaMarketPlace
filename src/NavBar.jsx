import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import Categories from "./Categories.jsx";
import "./NavBar.css";

class UnconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  resetQuery = () => {
    this.props.dispatch({ type: "searchTerms", query: "" });
  };

  logOut = () => {
    this.props.dispatch({ type: "logOut" });
    this.props.history.push("/");
  };

  render = () => {
    return (
      <div className="navcontainer navbar">
        <div>
          <Search />
        </div>
        <div onClick={this.resetQuery}>
          <Link to={"/"}>Home</Link>
        </div>
        <div>
          <Link to={"/cart"}>Cart</Link>
        </div>
        <div>
          <Link to={"/sellitem"}>Sell Item</Link>
        </div>
        <div>
          <Categories />
        </div>
        <div>
          <Link to="/purchaseHistory">Purchase History</Link>
        </div>
        <div className="logOut" onClick={this.logOut}>
          Logout
        </div>
      </div>
    );
  };
}

let NavBar = connect()(UnconnectedNavBar);

export default NavBar;
