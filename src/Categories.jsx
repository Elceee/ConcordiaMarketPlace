import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedCategories extends Component {
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
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      });
    });
    this.setState({ allCategories });
    console.log(this.state.allCategories);
  };

  renderCategoiesasOptions = () => {
    return this.state.allCategories.map(category => {
      return <option value={category}>{category}</option>;
    });
  };

  onSubmitHandler = () => {
    event.preventDefault();
    this.props.history.push("/category/" + event.target.value);
  };

  render = () => {
    return (
      <form>
        <select onChange={this.onSubmitHandler}>
          {this.renderCategoiesasOptions()}
        </select>
      </form>
    );
  };
}

let Categories = connect()(withRouter(UnconnectedCategories));

export default Categories;
