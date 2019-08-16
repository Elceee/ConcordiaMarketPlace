import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search.jsx";
import UserActions from "./UserActions.jsx";
import Categories from "./Categories.jsx";
import Modal from "react-modal";
import LandingPage from "./LandingPage.jsx";
import "./NavBar.css";

class UnconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { landingPageOpen: false };
  }
  resetQuery = () => {
    this.props.dispatch({ type: "searchTerms", query: "" });
  };

  resetQueryAndPage = () => {
    console.log("home");
    this.props.dispatch({ type: "searchTerms", query: "" });
    this.props.dispatch({ type: "pageChange", page: 0 });
  };

  logOut = () => {
    this.setState({ landingPageOpen: false });
    this.props.dispatch({ type: "logOut" });
    this.props.history.push("/");
  };

  renderLandingPage = () => {
    this.setState({ landingPageOpen: true });
  };

  render = () => {
    if (this.props.seller === undefined) {
      return (
        <div className="navcontainer navbar">
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
            <Link onClick={this.renderLandingPage}>Login</Link>
          </div>
          <Modal
            isOpen={this.state.landingPageOpen}
            style={{ content: { border: "none", background: "none" } }}
          >
            <LandingPage />
          </Modal>
        </div>
      );
    }
    if (this.props.seller !== undefined) {
      return (
        <div className="navcontainer navbar">
          <div>
            <Search />
          </div>
          <div onClick={this.resetQueryandPage}>
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
  return { seller: state.username };
};

let NavBar = connect(mapStateToProps)(withRouter(UnconnectedNavBar));

export default NavBar;
