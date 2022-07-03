import React, { Component } from "react";
import { ReactComponent as EmptyCart } from "./EmptyCart.svg";
import { connect } from "react-redux";
import { ReactComponent as Circle } from "./Circle.svg";
import "./MiniCart.css";

export class MiniCart extends Component {
  render() {
    //total qty reducer

    const cart = this.props.cart.reduce(
      (acc = {}, item = {}) => {
        acc.qty = parseFloat(acc.qty + item.qty);

        return acc;
      },
      {
        qty: 0,
      }
    );

    if (this.props.cart.length === 0) {
      return (
        <div>
          <EmptyCart />
        </div>
      );
    } else {
      if (cart.qty < 10) {
        return (
          <div className="mini-cart__empty-cart">
            <EmptyCart />
            <div className="mini-cart__circle">
              <Circle />
            </div>
            <div className="mini-cart__circle-text">{cart.qty}</div>
          </div>
        );
      } else {
        return (
          <div className="mini-cart__empty-cart">
            <EmptyCart />
            <div className="mini-cart__circle">
              <Circle />
            </div>
            <div className="mini-cart__circle-double">{cart.qty}</div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(MiniCart);
