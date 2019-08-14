import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
          <Link to={"/customizesellerpage/" + this.props.seller}>
            Customize Seller Page
          </Link>
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

let mapStateToProps = state => {
  return { seller: state.username };
};

let NavBar = connect(mapStateToProps)(withRouter(UnconnectedNavBar));

export default NavBar;
