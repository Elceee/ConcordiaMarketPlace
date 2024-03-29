import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearchInput: ""
    };
  }

  userSearchInputChangeHandler = event => {
    this.setState({ userSearchInput: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    let query = this.state.userSearchInput;
    this.props.dispatch({ type: "searchTerms", query: query });
    this.props.history.push("/");
  };

  render = () => {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <input
          type="text"
          onChange={this.userSearchInputChangeHandler}
          value={this.state.userSearchInput}
          placeholder="Find Your Bliss"
        />
      </form>
    );
  };
}

let Search = connect()(withRouter(UnconnectedSearch));

export default Search;
