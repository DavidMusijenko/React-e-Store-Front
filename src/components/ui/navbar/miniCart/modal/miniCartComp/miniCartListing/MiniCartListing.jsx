import React, { Component } from "react";
import "./MiniCartListing.css";
import MiniQuantitySelector from "./miniQuantitySelector/MiniQuantitySelector";
import MiniAttributeSelectorCart from "./miniAttributeSelectorCart/MiniAttributeSelectorCart";
import { connect } from "react-redux";
import MiniImgViewer from "./miniImgViewer/MiniImgViewer";

export class MiniCartListing extends Component {
  render() {
    const currencyObject = this.props.product.prices.filter(
      (el) => el.currency.label === this.props.currentCurrency.label
    );
    const currencySymbol = currencyObject[0].currency.symbol;
    const amount = currencyObject[0].amount;

    return (
      <div>
        <div className="mini-cart-listing__listing">
          <div className="mini-cart-listing__left-container">
            <div className="mini-cart-listing__text-cart">
              <div className="mini-cart-listing__product-name-cart mini-cart-listing--shift">
                {this.props.product.brand}
              </div>
              <div className="mini-cart-listing__product-name-cart mini-cart-listing--shift">
                {this.props.product.name}
              </div>

              <div className="mini-cart-listing__price mini-cart-listing--shift">
                {currencySymbol} {amount}
              </div>
              <div className="mini-cart-listing--shift">
                <MiniAttributeSelectorCart product={this.props.product} />
              </div>
            </div>
          </div>
          <div className="mini-cart-listing__right-side">
            <div className="mini-cart-listing__selector">
              <MiniQuantitySelector product={this.props.product} />
            </div>
            <div className="mini-cart-listing__image-container">
              <MiniImgViewer product={this.props.product} />
            </div>
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

export default connect(mapStateToProps)(MiniCartListing);
