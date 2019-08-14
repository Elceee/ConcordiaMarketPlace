import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Card.css";

class UnconnectedSellItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      description: "",
      price: 0,
      stock: 0,
      genres: [],
      imageFile: ""
    };
  }

  itemNameHandler = event => {
    this.setState({ itemName: event.target.value });
  };

  descriptionHandler = event => {
    this.setState({ description: event.target.value });
  };

  priceHandler = event => {
    this.setState({ price: event.target.value });
  };

  stockHandler = event => {
    this.setState({ stock: event.target.value });
  };

  genreChangeHandler = event => {
    let currentGenres = this.state.genres;
    if (currentGenres.includes(event.target.value)) {
      let updatedGenres = currentGenres.filter(item => !event.target.value);
      this.setState({ genres: updatedGenres }, () =>
        console.log("genres: ", this.state.genres)
      );
      return;
    }
    currentGenres.push(event.target.value);
    this.setState({ genres: currentGenres }, () =>
      console.log("genres: ", this.state.genres)
    );
  };

  imageHandler = event => {
    this.setState({ imageFile: event.target.files[0] });
  };

  sellItemSubmitHandler = async event => {
    event.preventDefault();
    console.log("genres: ", this.state.genres);
    let data = new FormData();
    data.append("name", this.state.itemName);
    data.append("image", this.state.imageFile);
    data.append("categories", this.state.genres);
    data.append("description", this.state.description);
    data.append("seller", this.props.seller);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    let response = await fetch("/sell-item", { method: "POST", body: data });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.history.push("/");
    }
  };

  render = () => {
    return (
      <div className="card center">
        <form onSubmit={this.sellItemSubmitHandler}>
          <input
            type="text"
            onChange={this.itemNameHandler}
            value={this.state.itemName}
            placeholder="item name"
          />
          <input
            type="text"
            onChange={this.descriptionHandler}
            value={this.state.description}
            placeholder="description"
          />
          <input
            type="number"
            onChange={this.priceHandler}
            value={this.state.price}
            placeholder="price"
          />
          <input
            type="number"
            onChange={this.stockHandler}
            value={this.state.stock}
            placeholder="# to sell"
          />
          <div>
            <div>Genres</div>
            Pop
            <input
              type="checkbox"
              name="pop"
              value="pop"
              onChange={this.genreChangeHandler}
            />
            Hip-hop
            <input
              type="checkbox"
              name="hip-hop"
              value="hip-hop"
              onChange={this.genreChangeHandler}
            />
            Rock
            <input
              type="checkbox"
              name="rock"
              value="rock"
              onChange={this.genreChangeHandler}
            />
            Jazz
            <input
              type="checkbox"
              name="jazz"
              value="jazz"
              onChange={this.genreChangeHandler}
            />
            Classical
            <input
              type="checkbox"
              name="classical"
              value="classical"
              onChange={this.genreChangeHandler}
            />
            Metal
            <input
              type="checkbox"
              name="metal"
              value="metal"
              onChange={this.genreChangeHandler}
            />
            Spoken Word
            <input
              type="checkbox"
              name="spoken word"
              value="spoken word"
              onChange={this.genreChangeHandler}
            />
          </div>
          <input type="file" onChange={this.imageHandler} />
          <input type="submit" value="post item to sell" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

let SellItem = connect(mapStateToProps)(withRouter(UnconnectedSellItem));

export default SellItem;
