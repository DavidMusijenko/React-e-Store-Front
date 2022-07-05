import React, { Component } from "react";
import "./PDP.css";

import { connect } from "react-redux";
import { addToCart, loadCurrentItem } from "../../redux/shopping/cart-actions";
import AttributesSelector from "./attributeSelector/AttributesSelector";
import GalleryElement from "./galleryElement/GalleryElement";
import ATCButton from "./atcButton/ATCButton";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOAD_SPECIFIC_PRODUCT } from "../graphql/Queries";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export class PDP extends Component {
  constructor(props) {
    super(props);

    const fetchDataSpecificProduct = async () => {
      try {
        return client
          .query({
            query: LOAD_SPECIFIC_PRODUCT,
            variables: {
              productId: this.props.match.params.id,
            },
          })
          .then((result) => this.props.loadCurrentItem(result.data.product));
      } catch (e) {
        console.error(e);
      }
    };

    if (this.props.currentItem === null) {
      fetchDataSpecificProduct();
    } else {
      if (this.props.currentItem.id !== this.props.match.params.id) {
        fetchDataSpecificProduct();
      }
    }
  }

  render() {
    if (this.props.currentItem !== null) {
      if (this.props.currentItem.id === this.props.match.params.id) {
        // double if statement to combat errors on page refresh
        if (
          this.props.currentItem === null ||
          this.props.currentCurrency === null
        ) {
          return null;
        } else {
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
                    <div className="PDP__product-brand">
                      {this.props.currentItem.brand}
                    </div>
                    <div className="PDP__product-name">
                      {this.props.currentItem.name}
                    </div>
                    <div>
                      {this.props.currentItem.id ===
                        this.props.match.params.id &&
                      this.props.currentItem.inStock ? (
                        <AttributesSelector
                          paramsid={this.props.match.params.id}
                          currentAttributeIndex="0"
                        />
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
                        <button className="PDP__out-button">
                          OUT OF STOCK
                        </button>
                      )}
                    </div>
                    <div>
                      {require("html-react-parser")(
                        this.props.currentItem.description
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
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
