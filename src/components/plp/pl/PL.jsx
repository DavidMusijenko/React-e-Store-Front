import React, { Component } from "react";
import "./PL.css";
import ButtonGreenCart from "./buttonGreenCart/ButtonGreenCart";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import {
  addToCart,
  loadCurrentItem,
} from "../../../redux/shopping/cart-actions";

export class PL extends Component {
  render() {
    if (this.props.currentCurrency.length !== 0) {
      const currencyObject = this.props.product.prices.filter(
        (el) => el.currency.label === this.props.currentCurrency.label
      );
      const currencySymbol = currencyObject[0].currency.symbol;
      const amount = currencyObject[0].amount;

      return (
        <div className="PL__cart">
          <NavLink to={`/product/${this.props.product.id}`}>
            <div
              className="PL__product"
              onClick={() => this.props.loadCurrentItem(this.props.product)}
            >
              <div className="PL__text">
                {!this.props.product.inStock ? (
                  <div className="PL__out-of-stock-text">OUT OF STOCK</div>
                ) : (
                  false
                )}
                <div className="PL__product-name">
                  {this.props.product.name}
                </div>
                <div className="PL__price-el">
                  <div className="PL__price">{currencySymbol}</div>
                  <div id="price" className="PL__price">
                    {amount}
                  </div>
                </div>
              </div>

              <img
                src={this.props.product.gallery[0]}
                alt={this.props.product.name}
                width="354"
                height="330"
                className={
                  this.props.product.inStock
                    ? "PL__img"
                    : "PL__img PL--out-of-stock"
                }
              />
            </div>
          </NavLink>
          {this.props.product.inStock ? (
            <div
              className="PL__atc"
              onClick={() => this.props.addToCart(this.props.product)}
            >
              <ButtonGreenCart />
            </div>
          ) : (
            false
          )}
        </div>
      );
    } else {
      return false;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.shop.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PL);
