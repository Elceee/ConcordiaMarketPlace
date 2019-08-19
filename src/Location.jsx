import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { location: "" };
  }
  changeHandler = event => {
    this.setState({ location: event.target.value });
    this.props.dispatch({ type: "location", location: event.target.value });
  };

  submitHandler() {
    let location = this.state.location;
    this.props.dispatch({ type: "location", location: location });
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        Select Shipping Region:
        <select name="location" onChange={this.changeHandler}>
          <option value="Canada">Canada</option>
          <option value="UnitedStates">United-States</option>
          <option value="SouthAmerica">South-America</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Australia">Australia / New Zealand</option>
        </select>
      </form>
    );
  }
}

let Location = connect()(UnconnectedLocation);

export default Location;
