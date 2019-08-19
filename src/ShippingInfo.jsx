import React, { Component } from "react";
import { connect } from "react-redux";
import "./shippinginfo.css";

class UnconnectedShippingInfo extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <form className="containerShip">
          <div className="left">
            Name:
            <input type="text" />
          </div>
          <div className="left">
            Address Line 1:
            <input className="longBox" type="text" />
          </div>
          <div className="left">
            Address Line 2:
            <input className="longBox" type="text" />
          </div>
          <div className="containerInner">
            Postal Code:
            <input type="text" /> City:
            <input type="text" />
          </div>

          <div className="containerInner">
            Province/State:
            <input type="text" />
            Country:
            <input type="text" />
          </div>
          <div>
            Phone Number:
            <input type="text" />
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { username: state.username };
};

let ShippingInfo = connect(mapStateToProps)(UnconnectedShippingInfo);

export default ShippingInfo;
