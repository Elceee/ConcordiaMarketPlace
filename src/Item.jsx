import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartAdder from "./CartAdder.jsx";
import "./Card.css";
import "./DynamicButton.css";
import "./item.css";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToCart = () => {
    let item = this.props.contents;
    let amountInCart = this.props.cart[this.props.contents._id];
    if (amountInCart === undefined) {
      amountInCart = 0;
    }
    let data = new FormData();
    data.append("itemId", item._id);
    data.append("quantity", amountInCart + 1);
    fetch("/add-to-cart", { method: "POST", body: data });
    this.props.dispatch({ type: "addToCart", item: item });
  };

  render = () => {
    let addToCartVisible = "";
    let cartAdderVisible = "none";
    if (this.props.inCart === "true") {
      addToCartVisible = "none";
      cartAdderVisible = "";
    }

    return (
      ///added card center to items
      <div className="card center ">
        <img src={this.props.contents.imagePath} />
        <h3>{this.props.contents.name}</h3>
        <div class="description">{this.props.contents.description}</div>
        <Link to={"/sellerpage/" + this.props.contents.seller}>
          <div>{this.props.contents.seller}</div>
        </Link>
        <div>Price: ${this.props.contents.price}</div>
        <div>{this.props.contents.stock} in stock</div>
        <Link
          className="detailsLink"
          to={"/itemdetails/" + this.props.contents._id}
        >
          Item Details
        </Link>
        <div>
          <div className="Cartbutton">
            <button
              onClick={this.addToCart}
              style={{ display: addToCartVisible }}
            >
              Add to Cart
            </button>
          </div>
          <div style={{ display: cartAdderVisible }}>
            <CartAdder contents={this.props.contents} />
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let Item = connect(mapStateToProps)(UnconnectedItem);

export default Item;
