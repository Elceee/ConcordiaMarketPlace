import React, { Component } from "react";
import "./Reviews.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      visible: false
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.setState({ item: this.props.item });
    }
  };

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

let Reviews = connect()(withRouter(UnconnectedReviews));

export default Reviews;
