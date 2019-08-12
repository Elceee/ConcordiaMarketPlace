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
      <div>
        {this.props.items.map(item => {
          return (
            <li>
              <Item contents={item} />
            </li>
          );
        })}
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <ul>{this.renderItemsAsLiElems()}</ul>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let ViewAllItems = connect(mapStateToProps)(UnconnectedViewAllItems);

export default ViewAllItems;
