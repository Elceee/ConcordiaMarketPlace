import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToCart = () => {
    let item = this.props.contents;
    let data = new FormData();
    data.append("itemId", item._id);
    fetch("/add-to-cart", { method: "POST", body: data });
    this.props.dispatch({ type: "addToCart", item: item });
  };

  render = () => {
    let addToCartButtonVisible = "visible";
    if (this.props.inCart) {
      addToCartButtonVisible = "hidden";
    }
    return (
      ///added card center to items
      <div className="card center ">
        <img src={this.props.contents.imagePath} height="150 px" />
        <h3>{this.props.contents.name}</h3>
        <div>{this.props.contents.description}</div>
        <div>{this.props.contents.seller}</div>
        <div>Price: ${this.props.contents.price}</div>
        <div>{this.props.contents.stock} in stock</div>
        <Link to={"/itemdetails/" + this.props.contents._id}>Item Details</Link>
        <div>
          <button
            onClick={this.addToCart}
            style={{ visibility: addToCartButtonVisible }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
}

let Item = connect()(UnconnectedItem);

export default Item;
