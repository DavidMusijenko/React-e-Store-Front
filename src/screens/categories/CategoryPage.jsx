import React, { Component } from "react";
import PLP from "../../components/plp/PLP";
import "./CategoryPage.css";
import { connect } from "react-redux";
import {
  setActiveCategory,
  addCurrency,
  addCategory,
  addToCategory,
} from "../../redux/shopping/cart-actions";

export class CategoryPage extends Component {
  render() {
    if (this.props.categories[this.props.category] === undefined) {
      return null;
    } else {
      return (
        <React.Fragment>
          <h1>{this.props.category}</h1>
          <div className="category-page__gallery">
            <PLP products={this.props.categories[this.props.category]} />
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.productsClothes,
    categories: state.shop.categoriesLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (category) => dispatch(setActiveCategory(category)),
    addCategory: (category) => dispatch(addCategory(category)),
    addCurrency: (currency) => dispatch(addCurrency(currency)),
    addToCategory: (category, data) => dispatch(addToCategory(category, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
