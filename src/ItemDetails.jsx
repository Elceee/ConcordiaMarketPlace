import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ""
    };
  }

  componentDidMount = async () => {
    let id = this.props._id;
    let data = new FormData();
    data.append("itemId", id);
    let response = await fetch("/get-item-by-id", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.setState({ item: body.item });
    }
  };
  addToCart = () => {
    let item = this.props.contents;
    let data = new FormData();
    data.append("item", item);
    fetch("/add-to-cart", { method: "POST", body: data });
    this.props.dispatch({ type: "addToCart", item: this.props.contents });
  };

  render = () => {
    return (
      <div>
        <h3>{this.state.item.name}</h3>
        <h4>Sold by: {this.state.item.seller}</h4>
        <div>Sold from </div>
        <div>Reviews here</div>
        <div>
          <button onClick={this.addToCart}>Add to Cart</button>
        </div>
      </div>
    );
  };
}

let ItemDetails = connect()(UnconnectedItemDetails);
export default ItemDetails;
