import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import CartAdder from "./CartAdder.jsx";
import "./Card.css";
import "./DynamicButton.css";
import "./item.css";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { putIncart: false, outOfStock: "" };
  }

  componentDidMount = () => {
    if (this.props.contents.stock <= 0) {
      this.setState({ outOfStock: true });
    } else {
      this.setState({ outOfStock: false });
    }
  };

  addToCart = () => {
    if (this.props.user === undefined) {
      this.props.history.push("/login");
      return;
    }
    if (this.props.contents.stock <= 0) {
      return;
    }
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
    this.setState({ putIncart: true });
  };

  isItemInStock = () => {
    if (this.state.outOfStock) {
      return <div>Out of Stock</div>;
    } else {
      return (
        <div>
          <div
            className={
              this.state.putIncart ? "visible itemAlert" : "invisible itemAlert"
            }
          >
            Item Added to Cart
          </div>
          <div
            className={
              this.state.putIncart ? "hidden Cartbutton" : "Cartbutton"
            }
          >
            <button onClick={this.addToCart}>Add to Cart</button>
          </div>
        </div>
      );
    }
  };

  render = () => {
    let x = <div />;
    if (this.props.inCart === "true") {
      addToCartVisible = "none";
      cartAdderVisible = "";
    }
    if (this.props.contents.stock <= 0) {
      x = <img className="soldOut" src="/uploads/sold out.png" />;
    }

    return (
      ///added card center to items
      <div className="card center ">
        <div className="albumImage">
          {x}
          <img src={this.props.contents.imagePath} />
        </div>
        <h3>{this.props.contents.name}</h3>
        <div className="description">{this.props.contents.description}</div>
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
        <div>{this.isItemInStock()}</div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart, user: state.username };
};

let Item = connect(mapStateToProps)(withRouter(UnconnectedItem));

export default Item;
