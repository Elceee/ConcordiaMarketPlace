import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemDetails extends Component {
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
    let response = await fetch("/get-dash-by-id", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.setState({ item: body.item });
    }
  };

  render = () => {
    return (
      <div>
        <h3>{this.state.item.name}</h3>
        <h4>Sold by: {this.state.item.seller}</h4>
        <div>Sold from {this.location}</div>
        <div>Reviews here</div>
      </div>
    );
  };
}

export default ItemDetails;
