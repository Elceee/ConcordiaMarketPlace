import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let allCategories = [];
    body.forEach(item => {
      item.categories.forEach(category => {
        if (!allCategories.contains(category)) {
          allCategories.push(category);
        }
      });
    });
    this.setState({ allCategories });
  };

  renderCategoiesasOptions = () => {
    return this.state.allCategories.map(category => {
      return (
        <option value={category}>
          <Link to={"/category/" + category}>{category}</Link>
        </option>
      );
    });
  };

  render = () => {
    return (
      <form>
        <select>{this.renderCategoiesasOptions()}</select>
      </form>
    );
  };
}
