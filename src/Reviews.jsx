import React, { Component } from "react";
import "./Reviews.css";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      visible: false
    };
  }

  revealReviews = () => {
    this.setState({ visible: !this.state.visible });
  };
  render = () => {
    return (
      <div
        className={
          this.state.visible ? "card center normal big" : "card center normal"
        }
      >
        <div>
          <button onClick={this.revealReviews}>See Reviews</button>
        </div>
        <div className={this.state.visible ? "visible" : "invisible"}>
          {this.state.item.reviews.map(review => {
            return (
              <div>
                <h3>{review.user}</h3>
                <div>{review.review}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}
