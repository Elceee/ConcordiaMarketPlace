import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddReview from "./AddReview.jsx";
import Reviews from "./Reviews.jsx";
import "./itemDetails.css";

class UnconnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      allItems: this.props.items
    };
  }

  componentDidMount = async () => {
    let id = this.props._id;
    let data = new FormData();
    data.append("itemId", id);
    let response = await fetch("/get-item-by-id", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.setState({ item: body.item });
    }
  };

  componentDidUpdate = async prevProps => {
    if (this.props._id !== prevProps._id) {
      let data = new FormData();
      data.append("itemId", this.props._id);
      let response = await fetch("/get-item-by-id", {
        method: "POST",
        body: data
      });
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      if (body.success) {
        this.setState({ item: body.item });
      }
    }
  };

  openLandingPage = () => {
    this.props.dispatch({ type: "openModal" });
  };
  addToCart = () => {
    if (this.props.user === undefined) {
      this.openLandingPage();
      return;
    }
    let item = this.state.item;
    let data = new FormData();
    data.append("item", item);
    fetch("/add-to-cart", { method: "POST", body: data });
    this.props.dispatch({ type: "addToCart", item: item });
  };

  findSimilarAlbums = () => {
    let categories = this.state.item.categories;
    let recommendAlbums = [];
    let allItems = this.props.items;
    categories.forEach(category => {
      let relatedAlbums = allItems.filter(album => {
        return album.categories.includes(category);
      });
      recommendAlbums = recommendAlbums.concat(relatedAlbums);
    });
    return recommendAlbums;
  };

  threeRandomAlbums = arr => {
    let currentIndex = arr.length;
    let tempHold;
    let ranIndex;
    if (arr.length <= 1) return arr;
    while (currentIndex !== 0) {
      ranIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempHold = arr[currentIndex];
      arr[currentIndex] = arr[ranIndex];
      arr[ranIndex] = tempHold;
    }
    let notSelf = arr.filter(album => {
      return album._id !== this.state.item._id;
    });
    let randomAlbums = notSelf.slice(0, 3);
    return randomAlbums;
  };

  renderRecommendedAlbums = () => {
    let albums = this.threeRandomAlbums(this.findSimilarAlbums());
    return (
      <div>
        {albums.map(album => {
          return (
            <div>
              <h3>{album.name}</h3>
              <img src={album.imagePath} />
              <div>{album.description}</div>
              <Link to={"/itemdetails/" + album._id}>Item Details</Link>
            </div>
          );
        })}
      </div>
    );
  };

  render = () => {
    let x = <div />;
    if (!this.state.item) return "Loading...";
    if (this.state.item.stock <= 0) {
      x = <img className="soldOut" src="/uploads/sold out.png" />;
    }
    return (
      <div className="itemDetailsContainer">
        <div>
          <div className="card center">
            <h3>{this.state.item.name}</h3>
            <div className="albumImage">
              {x}
              <img src={this.state.item.imagePath} />
            </div>
            <h4>
              Sold by:{" "}
              <Link to={"/sellerpage/" + this.state.item.seller}>
                {this.state.item.seller}
              </Link>
            </h4>
            <div>Units Sold: {this.state.item.quantityBought}</div>
            <div className="price">
              ${(this.state.item.price / 100).toFixed(2)}
            </div>
            <div>
              <button onClick={this.addToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="reviewsContainer">
          <div className="card center short">
            <div>Leave a Review!</div>
            <AddReview id={this.state.item._id} />
          </div>
          <div>
            <Reviews item={this.state.item} />
          </div>
        </div>
        <div>
          <div className="card center">
            <h2> People who listen to this ablum also enjoyed!</h2>
            {this.renderRecommendedAlbums()}
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items, user: state.username };
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);
export default ItemDetails;
