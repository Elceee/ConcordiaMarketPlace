import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartTotal.css";

class UnconnectedCartTotal extends Component {
  itemsWording = items => {
    if (items === 1) {
      return "1 Item";
    } else {
      return items + " Items";
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>{this.itemsWording(this.props.items())}</div>
          <div className="subTotal">{"" + this.props.subTotal}</div>
        </div>
        <div>
          <div>Shipping</div>
          <div className="subTotal">{this.props.shipping + ""}</div>
          <div>total is {this.props.total}</div>
        </div>
        <div>
          <div>Your Total</div>
          <div className="grandTotal">
            {"" + (this.props.shipping + this.props.subTotal)}
          </div>
        </div>
      </div>
    );
  }
}
//let mapStateToProps = state => {
//  return { total: state.total };
//};

let CartTotal = connect()(UnconnectedCartTotal);

export default CartTotal;
