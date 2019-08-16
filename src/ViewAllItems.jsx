import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedViewAllItems extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  nextHandler = () => {
    console.log("next");
    console.log("items", this.props.items.length);
    let nextPage = this.state.page + 1;
    if (nextPage * 9 <= this.props.items.length) {
      this.setState({ page: nextPage }, () => this.renderItemsAsLiElems());
    }
  };

  previousHandler = () => {
    console.log("previous");
    let previousPage = this.state.page - 1;
    if (previousPage >= 0) {
      this.setState({ page: previousPage }, () => this.renderItemsAsLiElems());
    }
  };

  //slices the items array depending on which page you're on.
  itemsToDisplay = () => {
    let x = 0 + this.state.page * 9;
    let y = 9 + this.state.page * 9;
    return this.props.items.slice(x, y);
  };

  renderItemsAsLiElems = () => {
    let key = 1;
    return (
      //class to auto-place items in css
      <div className="wrapper">
        {this.itemsToDisplay().map(item => {
          return <Item key={key++} contents={item} inCart="false" />;
        })}
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <div>{this.renderItemsAsLiElems()}</div>;
        <div>
          <button onClick={this.previousHandler}>Previous</button>
          <button onClick={this.nextHandler}>Next</button>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let ViewAllItems = connect(mapStateToProps)(UnconnectedViewAllItems);

export default ViewAllItems;
