import React, { Component } from "react";
import "./PDP.css";

import { connect } from "react-redux";
import { addToCart, loadCurrentItem } from "../../redux/shopping/cart-actions";
import AttributesSelector from "./attributeSelector/AttributesSelector";
import GalleryElement from "./galleryElement/GalleryElement";
import ATCButton from "./atcButton/ATCButton";

export class PDP extends Component {
  render() {
    // double if statement to combat errors on page refresh
    if (this.props.categoriesLoaded.all === undefined) {
      return null;
    } else {
      //finding current item

      const loadedItem = this.props.categoriesLoaded.all.find(
        (prod) => prod.id === this.props.match.params.id
      );

      if (this.props.currentItem === null) {
        this.props.loadCurrentItem(loadedItem);
      }

      //finding current price

      if (this.props.currentItem !== null) {
        const currencyObject = this.props.currentItem.prices.filter(
          (el) => el.currency.label === this.props.currentCurrency.label
        );
        const currencySymbol = currencyObject[0].currency.symbol;
        const amount = currencyObject[0].amount;

        return (
          <div className="PDP__containerPDP">
            <div className="PDP__container">
              <div className="PDP__gallery-element">
                <GalleryElement gallery={this.props.currentItem.gallery} />
              </div>

              <div className="PDP__right-info">
                <div className="PDP__product-name">
                  {this.props.currentItem.name}
                </div>
                <div>
                  {this.props.currentItem.inStock ? (
                    <AttributesSelector currentAttributeIndex="0" />
                  ) : (
                    <div></div>
                  )}
                  <div className="PDP__product-price">
                    {currencySymbol} {amount}
                  </div>
                </div>
                <div>
                  {this.props.currentItem.inStock ? (
                    <ATCButton />
                  ) : (
                    <button className="PDP__out-button">OUT OF STOCK</button>
                  )}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.currentItem.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
    currentCurrency: state.shop.currentCurrency,
    categoriesLoaded: state.shop.categoriesLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
