import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search.jsx";
import UserActions from "./UserActions.jsx";
import Categories from "./Categories.jsx";
import LandingPage from "./LandingPage.jsx";
import "./NavBar.css";

class UnconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loginPageOpen: false };
  }
  resetQuery = () => {
    this.props.dispatch({ type: "searchTerms", query: "" });
  };

  resetQueryAndPage = () => {
    console.log("home");
    this.props.dispatch({ type: "searchTerms", query: "" });
    this.props.dispatch({ type: "pageChange", page: 0 });
  };

  logOut = async () => {
    this.setState({ loginPageOpen: false });
    let response = await fetch("/logout");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.props.dispatch({ type: "logOut" });
      this.props.history.push("/");
    }
  };

  openLandingPage = () => {
    this.props.dispatch({ type: "openModal" });
  };

  render = () => {
    if (this.props.seller === undefined) {
      return (
        <div className="navcontainer navbar">
          <div className="toFront">
            <img
              id="record"
              src="/uploads/logobiggest.png"
              height="20px"
              width="20px"
            />
            <div className="arm">
              <img
                id="armm"
                src="/uploads/arm.png"
                height="20px"
                width="20px"
              />
            </div>
          </div>
          <div>
            <Search />
          </div>
          <div onClick={this.resetQueryAndPage}>
            <Link to={"/"}>Home</Link>
          </div>
          <div>
            <Categories loggedIn="false" />
          </div>
          <div onClick={this.resetQuery}>
            <Link onClick={this.openLandingPage}>Login</Link>
          </div>
        </div>
      );
    }
    if (this.props.seller !== undefined) {
      return (
        <div className="navcontainer navbar">
          <div className="toFront">
            <img
              id="record"
              src="/uploads/logobiggest.png"
              height="20px"
              width="20px"
            />
            <div className="arm">
              <img
                id="armm"
                src="/uploads/arm.png"
                height="20px"
                width="20px"
              />
            </div>
          </div>
          <div>
            <Search />
          </div>
          <div onClick={this.resetQueryAndPage}>
            <Link to={"/"}>Home</Link>
          </div>
          <div>
            <Link to={"/cart"}>Cart</Link>
          </div>

          <div>
            <Categories loggedIn="true" />
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
  return { seller: state.username, landingPageOpen: state.landingPageOpen };
};

let NavBar = connect(mapStateToProps)(withRouter(UnconnectedNavBar));

export default NavBar;
