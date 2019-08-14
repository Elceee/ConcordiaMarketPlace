import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCustomizeSellerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerDescription: "",
      profilePicture: "",
      backgroundColor: ""
    };
  }

  descriptionChangeHandler = event => {
    this.setState({ sellerDescription: event.target.value });
  };

  colorChangeHandler = event => {
    this.setState({ backgroundColor: event.target.value });
  };

  picChangeHandler = event => {
    this.setState({ profilePicture: event.target.value });
  };

  submitCustomizationsHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    let sellerPageCustomization = this.state;
    data.append("sellerPageCustomization", sellerPageCustomization);
    data.append("username", this.props.username);
    let response = await fetch("/customize-seller-page", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.history.push("/seller-profile" + this.props.username);
    }
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitCustomizationsHandler}>
          <label>Add a description:</label>
          <input
            type="textarea"
            rows="6"
            columns="50"
            value={this.state.sellerDescription}
            onChange={this.descriptionChangeHandler}
          />
          <label>Choose a background color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={this.colorChangeHandler}
          />
          <label>Add a profile picture:</label>
          <input
            type="file"
            value={profilePicture}
            onChange={this.picChangeHandler}
          />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username };
};

let CustomizeSellerPage = connect(mapStateToProps)(
  withRouter(UnconnectedCustomizeSellerPage)
);

export default CustomizeSellerPage;
