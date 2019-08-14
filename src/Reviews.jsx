import React, { Component } from "react";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
  }
  render = () => {
    return (
      <div>
        {this.state.item.reviews.map(review => {
          return (
            <div>
              <h3>{review.user}</h3>
              <div>{review.review}</div>
            </div>
          );
        })}
      </div>
    );
  };
}
