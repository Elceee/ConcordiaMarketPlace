import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToCart = () => {
    this.props.dispatch({ type: "addToCart", item: this.props.contents });
  };

  render = () => {
    return (
      <div>
        <h3>{this.props.contents.name}</h3>
        <img src={this.props.contents.imagePath} height="150 px" />
        <div>{this.props.contents.description}</div>
        <div>{this.props.contents.seller}</div>
        <div>Price: ${this.props.contents.price}</div>
        <div>{this.props.contents.stock} in stock</div>
        <Link to={"/itemdetails/" + this.props.contents._id}>Item Details</Link>
        <div>
          <button onClick={this.addToCart}>Add to Cart</button>
        </div>
      </div>
    );
  };
}

let Item = connect()(UnconnectedItem);

export default Item;
