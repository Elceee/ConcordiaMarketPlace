import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

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
    console.log("sellerProfile mounted");
    let seller = this.props.seller;
    let data = new FormData();
    data.append("seller", seller);
    let response = await fetch("/seller-profile", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body);
    if (body.success) {
      this.setState(
        {
          sellerDescription:
            body.custom.sellerPageCustomization.sellerDescription,
          profilePicture: body.custom.sellerPageCustomization.profilePicture,
          backgroundColor: body.custom.sellerPageCustomization.backgroundColor
        },
        () => console.log(this.state)
      );
    }
    if (this.state.profilePicture === undefined) {
      this.setState({ profilePicture: "/uploads/no-image.png" });
    }
    if (this.state.sellerDescription === undefined) {
      this.setState({
        sellerDesctription: "This seller has not entered a description"
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

  renderBackgroundColor = () => {
    if (this.state.backgroundColor === "") {
      return "#f2b880";
    } else {
      return this.state.backgroundColor;
    }
  };

  render = () => {
    let color = this.renderBackgroundColor();
    console.log("Color:", color);
    return (
      <div style={{ backgroundColor: color }}>
        <h1>{this.state.seller}'s Seller Page</h1>
        <div>
          <img src={this.state.profilePicture} />
          <h3>{this.state.sellerDescription}</h3>
          <div>{this.renderSellerItemsAsLiElems()}</div>
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
