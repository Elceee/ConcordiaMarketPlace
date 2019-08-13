import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSellItem extends Component {
  render = () => {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={this.itemNameHandler}
            value="itemName"
            placeholder="item name"
          />
          <input
            type="text"
            onChange={this.descriptionHandler}
            value="description"
            placeholder="description"
          />
          <input
            type="text"
            onChange={this.priceHandler}
            value="price"
            placeholder="price"
          />
          <input type="text" onChange={this.stockHandler} value="stock" placeholder="# to sell"/>
          <input type="checkbox" 
        </form>
      </div>
    );
  };
}
