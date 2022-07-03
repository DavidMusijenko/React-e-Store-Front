import React, { Component } from "react";
import "./MiniCartTotal.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class MiniCartTotal extends Component {
  render() {
    //current currency symbol

    const currencyObject = this.props.cart[0].prices.filter(
      (el) => el.currency.label === this.props.currentCurrency.label
    );
    const currencySymbol = currencyObject[0].currency.symbol;

    //total amount reducer

    const cart = this.props.cart.reduce(
      (acc = {}, item = {}) => {
        const priceObject = item.prices.filter(
          (el) => el.currency.label === this.props.currentCurrency.label
        );
        const itemTotal = parseFloat(
          (priceObject[0].amount * item.qty).toFixed(2)
        );
        acc.total = parseFloat((acc.total + itemTotal).toFixed(2));

        return acc;
      },
      {
        total: 0,
      }
    );

    return (
      <div>
        <div className="mini-cart-total__total">
          <div className="mini-cart-total__left-side">
            <div className="mini-cart-total__text">Total: </div>
          </div>
          <div className="mini-cart-total__right-side">
            <div>
              {currencySymbol}
              {cart.total.toString()}
            </div>
          </div>
        </div>
        <div className="mini-cart-total__button-container">
          <div>
            <Link to="/Cart">
              <button
                onClick={() => this.props.onClick(0)}
                className="mini-cart-total__view-bag-button"
              >
                VIEW BAG
              </button>
            </Link>
          </div>
          <div>
            <button
              className="mini-cart-total__check-out-button"
              onClick={() =>
                this.props.onClick(0) && console.log("Order created")
              }
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currentCurrency: state.shop.currentCurrency,
  };
};

export default connect(mapStateToProps)(MiniCartTotal);
