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
      <div className="dropDown" style={{ width: "126.49px" }}>
        <div>Profile</div>
        <div className="dropDownContent" style={{ left: "880px" }}>
          <div>
            <Link to={"/sellitem"} style={{ width: "127.49px" }}>
              Sell Item
            </Link>
          </div>
          <div>
            <Link
              to={"/customizesellerpage/" + this.props.seller}
              style={{ width: "127.49px" }}
            >
              Seller Page
            </Link>
          </div>
          <div>
            <Link to="/purchaseHistory" style={{ width: "127.49px" }}>
              Purchase History
            </Link>
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
