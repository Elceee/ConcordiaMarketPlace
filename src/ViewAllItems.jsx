import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedViewAllItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let getAllItems = async () => {
      let response = await fetch("/all-items");
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      if (body.success !== false) {
        this.props.dispatch({ type: "updateItems", items: body });
      }
    };
    getAllItems();
  };

  renderItemsAsLiElems = () => {
    return (
      //class to auto-place items in css
      <div className="wrapper">
        {this.props.items.map(item => {
          return (
            <div>
              <Item contents={item} />
            </div>
          );
        })}
      </div>
    );
  };

  render = () => {
    return <div>{this.renderItemsAsLiElems()}</div>;
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let ViewAllItems = connect(mapStateToProps)(UnconnectedViewAllItems);

export default ViewAllItems;
