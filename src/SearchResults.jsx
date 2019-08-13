import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

class UnconnectedSearchResults extends Component {
  render = () => {
    let results = this.props.items.filter(item => {
      //let lowerCats = item.categories.map(i => {
      //  return i.toLowerCase();
      //});
      return (
        ///returns query from name, description or categories
        item.name.toLowerCase().includes(this.props.query.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(this.props.query.toLowerCase()) ||
        item.categories.includes(this.props.query)
      );
    });
    return (
      //class to auto-place items in css
      <div className="wrapper">
        {console.log(this.props.items, this.props.query)}
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
    query: state.query,
    items: state.items
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
