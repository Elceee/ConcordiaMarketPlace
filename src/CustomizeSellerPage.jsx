import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CustomizeSellerPage.css";
import "./Card.css";

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
    this.setState({ backgroundColor: event.target.value }, () =>
      console.log(this.state)
    );
  };

  picChangeHandler = event => {
    this.setState({ profilePicture: event.target.files[0] });
  };

  submitCustomizationsHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("sellerDescription", this.state.sellerDescription);
    data.append("profilePicture", this.state.profilePicture);
    data.append("backgroundColor", this.state.backgroundColor);
    data.append("username", this.props.username);
    let response = await fetch("/customize-seller-page", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.history.push("/sellerpage/" + this.props.username);
    }
  };

  render = () => {
    return (
      <div className="card center customize">
        <form onSubmit={this.submitCustomizationsHandler}>
          <div className="customize">
            <div>
              <div>
                <label>Add a description</label>
              </div>
              <input
                type="text"
                rows="6"
                columns="50"
                value={this.state.sellerDescription}
                onChange={this.descriptionChangeHandler}
                placeholder="Description"
              />
            </div>
            <div>
              <div>
                <label>Choose a background color:</label>
              </div>
              <input
                type="color"
                value={this.state.backgroundColor}
                onChange={this.colorChangeHandler}
              />
            </div>
            <div>
              <div>
                <label>Add a profile picture:</label>
              </div>
              <input type="file" onChange={this.picChangeHandler} />
            </div>
            <div>
              <input type="submit" value="Trick out your page!" />
            </div>
          </div>
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
