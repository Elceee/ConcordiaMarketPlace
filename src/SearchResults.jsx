import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearchResults extends Component {
  render = () => {
    let results = this.props.items.filter(item => {
      return (
        item.name.includes(this.props.query) ||
        item.description.includes(this.props.query) ||
        item.categories.includes(this.props.query)
      );
    });
    return (
      //class to auto-place items in css
      <div className="wrapper">
        {results.map(item => {
          return (
            <div>
              <Item contents={item} />
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    query: state.searchQuery,
    items: state.items
  };
};
