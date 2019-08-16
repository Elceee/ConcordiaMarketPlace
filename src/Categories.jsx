import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Categories.css";

class UnconnectedCategories extends Component {
  renderCategoiesasOptions = () => {
    let allCategories = [];
    this.props.items.forEach(item => {
      item.categories.forEach(category => {
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      });
    });
    allCategories = allCategories.sort();
    return allCategories.map(category => {
      return (
        <div key={category} className="dropDownItem">
          <Link to={"/category/" + category}>{category}</Link>
        </div>
      );
    });
  };

  onSubmitHandler = () => {
    event.preventDefault();
    this.props.history.push("/category/" + event.target.value);
  };

  render = () => {
    return (
      <div className="dropDown">
        <div>Categories</div>
        <div className="dropDownContent">{this.renderCategoiesasOptions()}</div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let Categories = connect(mapStateToProps)(withRouter(UnconnectedCategories));

export default Categories;
