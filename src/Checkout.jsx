import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import "./checkout.css";

class UnconnectedCheckout extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_t4ISlyycf6sw9ZbwoENR1qmq006YSBSRHX
        "
      />
    );
  }
}

let Checkout = connect()(UnconnectedCheckout);

export default Checkout;
