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
    data.append("amount", this.props.amount);
    let response = await fetch("/stripe-charge", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("saving stripe token");
    if (body.success === true) {
      alert("We are in business!");
    }
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

let Checkout = connect()(UnconnectedCheckout);

export default Checkout;
