import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import Categories from "./Categories.jsx";
import "./NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div className="navcontainer navbar">
        <div>
          <Search />
        </div>
        <div>
          <Link to={"/"}>Home</Link>
        </div>
        <div>
          <Link to={"/cart"}>Cart</Link>
        </div>
        <div>
          <Categories />
        </div>
      </div>
    );
  };
}
