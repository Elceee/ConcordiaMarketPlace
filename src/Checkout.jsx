import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import "./checkout.css";

class UnconnectedCheckout extends Component {
  onToken = async token => {
    console.log("token is: ", token);
    console.log("cart total is", this.props.amount);
    let data = new FormData();
    data.append("token", JSON.stringify(token));
    data.append("amount", this.props.total);
    let response = await fetch("/stripe-charge", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("saving stripe token");
    if (body.success === true) {
      alert("Payment Approved");
      this.purchaseCart();
    }
  };

  purchaseCart = () => {
    let cart = { ...this.props.cart };
    console.log("logging cart in cart endpoint", cart);
    let data = new FormData();
    data.append("cart", JSON.stringify(cart));
    fetch("/purchaseCart", { method: "post", body: data });
    this.props.dispatch({ type: "purchaseCart" });
  };

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_t4ISlyycf6sw9ZbwoENR1qmq006YSBSRHX"
      />
    );
  }
}
let mapStateToProps = state => {
  return { total: state.total / 100 };
};

let Checkout = connect(mapStateToProps)(UnconnectedCheckout);

export default Checkout;
