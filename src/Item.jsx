import React, { Component } from "react";
import { connect } from "react-redux";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    <div>
      <h3>{this.props.contents.name}</h3>
      <img src={this.props.contents.frontEnd} />
      <div>{this.props.contents.description}</div>
      <div>{this.props.contents.seller}</div>
      <div>Price: ${this.props.contents.price}</div>
      <div>{this.props.contents.stock} in stock</div>
    </div>;
  };
}