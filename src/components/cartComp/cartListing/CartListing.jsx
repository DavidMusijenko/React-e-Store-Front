import React, { Component } from "react";
import "./CartListing.css";
import QuantitySelector from "./QuantitySelector/QuantitySelector";
import AttributeSelectorCart from "./attributeSelectorCart/AttributeSelectorCart";
import { connect } from "react-redux";
import ImgViewer from "./imgViewer/ImgViewer";

export class CartListing extends Component {
  render() {
    const currencyObject = this.props.product.prices.filter(
      (el) => el.currency.label === this.props.currentCurrency.label
    );
    const currencySymbol = currencyObject[0].currency.symbol;
    const amount = currencyObject[0].amount;
    return (
      <div className="cart-listing__listing">
        <div className="cart-listing__text">
          <div className="cart-listing__product-name">
            {this.props.product.name}
          </div>
          <div className="cart-listing__price">
            {currencySymbol} {amount}
          </div>
          <div>
            <AttributeSelectorCart product={this.props.product} />
          </div>
        </div>
        <div className="cart-listing__right-side">
          <div className="cart-listing__selector">
            <QuantitySelector product={this.props.product} />
          </div>
          <div>
            <ImgViewer product={this.props.product} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.shop.currentCurrency,
  };
};

export default connect(mapStateToProps)(CartListing);
