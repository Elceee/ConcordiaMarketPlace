import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";
import EventListener, { withOptions } from "react-event-listener";

class UnconnectedViewAllItems extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.state, viewAll: false };
  }

  fromAtoZ = (a, b) => {
    let albumA = a.name.toUpperCase();
    let albumB = b.name.toUpperCase();

    let comparison = 0;
    if (albumA > albumB) {
      comparison = 1;
    }
    if (albumA < albumB) {
      comparison = -1;
    }
    return comparison;
  };

  //diplays the next 9 items in the items array
  nextHandler = async () => {
    console.log("next");
    console.log("items", this.props.items.length);
    await this.setState({ viewAll: false });
    let nextPage = this.props.page + 1;
    if (nextPage * 9 <= this.props.items.length) {
      this.setState({ page: nextPage }, () => {
        this.props.dispatch({ type: "pageChange", page: this.state.page });
        this.renderItemsAsLiElems();
      });
    }
  };

  //displays the previous 9 items in the items array
  previousHandler = async () => {
    console.log("previous");
    await this.setState({ viewAll: false });
    let previousPage = this.props.page - 1;
    if (previousPage >= 0) {
      this.setState({ page: previousPage }, () => {
        this.props.dispatch({ type: "pageChange", page: this.state.page });
        this.renderItemsAsLiElems();
      });
    }
  };

  handleKeyPress = event => {
    if (event.keyCode === 37) {
      this.previousHandler();
    }
    if (event.keyCode === 39) {
      this.nextHandler();
    }
  };

  //slices the items array depending on which page you're on.
  itemsToDisplay = () => {
    let alphabeticalItems = this.props.items.sort(this.fromAtoZ);
    if (this.state.viewAll === false) {
      let x = 0 + this.props.page * 9;
      let y = 9 + this.props.page * 9;
      return alphabeticalItems.slice(x, y);
    }
    if (this.state.viewAll === true) {
      return this.props.items;
    }
  };

  pageButtonHandler = async value => {
    await this.setState({ viewAll: false });
    let newPage = value - 1;
    this.setState({ page: newPage }, () => {
      this.props.dispatch({ type: "pageChange", page: this.state.page });
      this.renderItemsAsLiElems();
    });
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
          return <button onClick={() => this.pageButtonHandler(p)}>{p}</button>;
        })}
      </div>
    );
  };

  viewAllHandler = () => {
    let alphabeticalItems = this.props.items.sort(this.fromAtoZ);
    let key = 1;
    this.setState({ viewAll: true }, () => {
      return (
        //class to auto-place items in css
        <div className="wrapper">
          {alphabeticalItems.map(item => {
            return <Item key={key++} contents={item} inCart="false" />;
          })}
        </div>
      );
    });
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
        <div>{this.renderItemsAsLiElems()}</div>
        <div className="pageButtons">
          <div>
            <button onClick={this.previousHandler}>Previous</button>
            <button onClick={this.nextHandler}>Next</button>
          </div>
          <div>
            <div>{this.displayPageLinks()}</div>
            <div>
              <button onClick={this.viewAllHandler}>View All Items</button>
            </div>
          </div>
        </div>
        <EventListener target={document} onKeyDown={this.handleKeyPress} />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items, page: state.page };
};

let ViewAllItems = connect(mapStateToProps)(UnconnectedViewAllItems);

export default ViewAllItems;
