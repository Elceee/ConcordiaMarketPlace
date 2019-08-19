import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Card.css";
import "./sellItem.css";

class UnconnectedSellItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      description: "",
      price: "",
      stock: "",
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
    data.append("description", "By" + this.state.description);
    data.append("seller", this.props.seller);
    data.append("price", this.state.price * 100);
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
        <h1>Enter Item Information</h1>
        <form onSubmit={this.sellItemSubmitHandler}>
          <div className="sellItem">
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
              placeholder="Artist Name"
            />
            <input
              type="text"
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
          </div>

          <div>Genres</div>
          <div className="sellItem">
            <div>
              <input
                type="checkbox"
                name="pop"
                value="pop"
                onChange={this.genreChangeHandler}
              />
              Pop
            </div>
            <div>
              <input
                type="checkbox"
                name="hip-hop"
                value="hip-hop"
                onChange={this.genreChangeHandler}
              />
              Hip-hop
            </div>
            <div>
              <input
                type="checkbox"
                name="rock"
                value="rock"
                onChange={this.genreChangeHandler}
              />
              Rock
            </div>
            <div>
              <input
                type="checkbox"
                name="jazz"
                value="jazz"
                onChange={this.genreChangeHandler}
              />
              Jazz
            </div>
            <div>
              <input
                type="checkbox"
                name="classical"
                value="classical"
                onChange={this.genreChangeHandler}
              />
              Classical
            </div>
            <div>
              <input
                type="checkbox"
                name="metal"
                value="metal"
                onChange={this.genreChangeHandler}
              />
              Metal
            </div>
            <div>
              <input
                type="checkbox"
                name="spoken word"
                value="spoken word"
                onChange={this.genreChangeHandler}
              />
              Spoken Word
            </div>
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
