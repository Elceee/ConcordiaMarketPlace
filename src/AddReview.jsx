import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedAddReview extends Component {
  constructor(props) {
    super(props);
    this.state = { review: "" };
  }

  reviewChangeHandler = event => {
    this.setState({ review: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    let review = this.state.review;
    let data = new FormData();
    data.append("review", review);
    data.append("id", this.props.id);
    fetch("/addReview", { method: "POST", body: data });
    this.setState({ review: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            value={this.state.review}
            onChange={this.reviewChangeHandler}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

let AddReview = connect()(UnconnectedAddReview);

export default AddReview;
