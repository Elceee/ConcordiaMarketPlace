import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: this.props.seller,
      sellerDescription: "",
      profilePicture: "",
      backgroundColor: "",
      allItems: this.props.items
    };
  }

  componentDidMount = async () => {
    let seller = this.props.seller;
    let data = new FormData();
    data.append("seller", seller);
    let response = await fetch("/seller-profile", {
      method: "GET",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.setState({
        sellerDescription: body.sellerDescription,
        profilePicture: body.profilePicture,
        backgroundColor: body.backgroundColor
      });
    }
  };

  renderSellerItemsAsLiElems = () => {
    let itemsToRender = this.props.items.filter(
      item => item.seller === this.props.seller
    );
    return (
      //class to auto-place items in css
      <div className="wrapper">
        {itemsToRender.map(item => {
          return (
            <div>
              <Item contents={item} />
            </div>
          );
        })}
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <h1>{this.state.seller}'s Seller Page</h1>
        <div>
          <img src={this.state.profilePicture} />
          <h3>{this.state.sellerDescription}</h3>
          <div>{this.renderSellerItemsAsLiElems}</div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let SellerProfile = connect(mapStateToProps)(UnconnectedSellerProfile);
export default SellerProfile;
