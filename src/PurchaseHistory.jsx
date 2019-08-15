import React, { Component } from "react";
import PurchasedItem from "./PurchasedItem.jsx";
import { connect } from "react-redux";

class UnconnectedPurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], counter: 1 };
  }

  findItemById = itemId => {
    let item = this.props.items.filter(item => {
      return item._id === itemId;
    });
    return item[0];
  };
  componentDidMount = async () => {
    let response = await fetch("/purchaseHistory", {
      method: "POST",
      credentials: "include"
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);

    let orders = parsed.map(order => {
      return order.cart;
    });

    let ordersWithItems = orders.map(order => {
      return Object.keys(order).map(itemId => {
        {
          let item = this.findItemById(itemId);
          return { item: item, count: order[itemId] };
        }
      });
    });

    this.setState({ orders: ordersWithItems });
  };

  render() {
    let noPurchases = false;
    if (this.state.orders.length === 0) {
      noPurchases = true;
    }

    if (noPurchases) {
      return (
        <div>
          <h3>You haven't bought anything yet :/</h3>
          <div>Get in there!</div>
        </div>
      );
    }
    let counter = 1;
    let key = 1;
    return (
      <div>
        {this.state.orders.map(order => {
          let orderTotal = 0;
          return (
            <div>
              <h4>Order #{counter++}</h4>
              {order.map(object => {
                orderTotal += object.count * object.item.price;
                return <PurchasedItem item={object.item} />;
              })}
              <h4>Total: ${orderTotal}</h4>
            </div>
          );
        })}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { items: state.items };
};
let PurchaseHistory = connect(mapStateToProps)(UnconnectedPurchaseHistory);
export default PurchaseHistory;
