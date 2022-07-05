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
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_PRODUCTS } from "../../components/graphql/Queries";

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

export class CategoryPage extends Component {
  constructor(props) {
    super(props);

    // added a check if the category was loaded previously

    const fetchDataCategoryPage = async () => {
      try {
        if (this.props.categories[this.props.category] === undefined) {
          return client
            .query({
              query: GET_PRODUCTS,
              variables: {
                input: this.props.category,
              },
            })
            .then((result) =>
              this.props.addToCategory(
                this.props.category,
                result.data.category.products
              )
            );
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchDataCategoryPage();
  }

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
