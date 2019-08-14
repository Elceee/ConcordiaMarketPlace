import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

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

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_eVGbOfPC4Q4VVWcP7wJ4ZGEF00n8wPjAYu
        "
      />
    );
  }
}

let Checkout = connect()(Unc)

export default Checkout;
