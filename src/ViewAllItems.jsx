import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedViewAllItems extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  //diplays the next 9 items in the items array
  nextHandler = () => {
    console.log("next");
    console.log("items", this.props.items.length);
    let nextPage = this.state.page + 1;
    if (nextPage * 9 <= this.props.items.length) {
      this.setState({ page: nextPage }, () => this.renderItemsAsLiElems());
    }
  };

  //displays the previous 9 items in the items array
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

  pageButtonHandler = event => {
    let newPage = event.target.value - 1;
    this.setState({ page: newPage }, () => this.renderItemsAsLiElems());
  };

  displayPageLinks = () => {
    let numberOfPages = Math.ceil(this.props.items.length / 9);
    console.log("number of pages: ", numberOfPages);
    let pageArray = [];
    for (let p = 1; p <= numberOfPages; p++) {
      pageArray.push(p);
    }
    return (
      <div className="pageNumbers">
        {pageArray.map(p => {
          return (
            <button value={p} onClick={this.pageButtonHandler}>
              {p}
            </button>
          );
        })}
      </div>
    );
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
          <div>{this.displayPageLinks()}</div>
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
