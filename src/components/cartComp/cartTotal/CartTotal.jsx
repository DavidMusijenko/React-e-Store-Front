import React, { Component } from "react";
import "./CartTotal.css";
import { connect } from "react-redux";

export class CartTotal extends Component {
  render() {
    //current currency symbol

    const currencyObject = this.props.cart[0].prices.filter(
      (el) => el.currency.label === this.props.currentCurrency.label
    );
    const currencySymbol = currencyObject[0].currency.symbol;

    //total amount reducer

    const taxRate = 0.21; // 21%

    const cart = this.props.cart.reduce(
      (acc = {}, item = {}) => {
        const priceObject = item.prices.filter(
          (el) => el.currency.label === this.props.currentCurrency.label
        );
        const itemTotal = parseFloat(
          (priceObject[0].amount * item.qty).toFixed(2)
        );
        const itemTotalTax = parseFloat((itemTotal * taxRate).toFixed(2));
        acc.qty = parseFloat(acc.qty + item.qty);
        acc.tax = parseFloat((acc.tax + itemTotalTax).toFixed(2));
        acc.total = parseFloat((acc.total + itemTotal).toFixed(2));

        return acc;
      },
      {
        qty: 0,
        tax: 0,
        total: 0,
      }
    );

    return (
      <div>
        <div className="cart-total__total">
          <div className="cart-total__left-side">
            <div>Tax 21%: </div>
            <div>Quantity: </div>
            <div className="cart-total__text">Total: </div>
          </div>
          <div className="cart-total__right-side">
            <div>
              {currencySymbol}
              {cart.tax.toString()}
            </div>
            <div>{cart.qty.toString()}</div>
            <div>
              {currencySymbol}
              {cart.total.toString()}
            </div>
          </div>
        </div>
        <button
          onClick={() => console.log("Order was made")}
          className="cart-total__button-order"
        >
          ORDER
        </button>
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

export default connect(mapStateToProps)(CartTotal);
