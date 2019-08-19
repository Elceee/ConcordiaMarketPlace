import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Categories.css";

class UnconnectedUserActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div className="dropDown">
        <div style={{ minWidth: "159.49px" }}>Profile</div>
        <div className="dropDownContent">
          <div className="dropDownItem">
            <Link to={"/sellitem"}>Sell Item</Link>
          </div>
          <div className="dropDownItem">
            <Link to={"/sellerpage/" + this.props.seller}>
              View Seller Page
            </Link>
          </div>
          <div className="dropDownItem">
            <Link to={"/customizesellerpage/" + this.props.seller}>
              Customize Seller Page
            </Link>
          </div>
          <div className="dropDownItem">
            <Link to="/purchaseHistory">Purchase History</Link>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

let UserActions = connect(mapStateToProps)(UnconnectedUserActions);

export default UserActions;
