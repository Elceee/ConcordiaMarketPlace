import React, { Componet } from "react";
import { Link } from "react-router-dom";
import Search from "Search.jsx";
import Categories from "./Category";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div>
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
