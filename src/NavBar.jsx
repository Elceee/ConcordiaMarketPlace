import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search.jsx";
import UserActions from "./UserActions.jsx";
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
    if (this.props.seller === undefined) {
      return (
        <div className="navcontainer navbar">
          <div>
            <Search />
          </div>
          <div onClick={this.resetQuery}>
            <Link to={"/"}>Home</Link>
          </div>
          <div>
            <Categories />
          </div>
          <div onClick={this.resetQuery}>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }
    if (this.props.seller !== undefined) {
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
            <Categories />
          </div>
          <div>
            <UserActions />
          </div>
          <div className="logOut" onClick={this.logOut}>
            Logout
          </div>
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

let NavBar = connect(mapStateToProps)(withRouter(UnconnectedNavBar));

export default NavBar;
