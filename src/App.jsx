import React, { Component } from "react";
import NavBar from "./components/ui/navbar/NavBar";
import Cart from "./screens/cart/Cart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PDP from "./components/pdp/PDP";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CategoryPage from "./screens/categories/CategoryPage";
import { connect } from "react-redux";
import {
  setActiveCategory,
  addCurrency,
  addCategory,
  addToCategory,
  setCurrency,
} from "./redux/shopping/cart-actions";
import { LOAD_CURRENCIES, LOAD_CATEGORIES } from "./components/graphql/Queries";

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

export class App extends Component {
  constructor(props) {
    super(props);

    const fetchData = async () => {
      try {
        if (this.props.categories.length === 0) {
          const currenciesQuery = await client.query({
            query: LOAD_CURRENCIES,
          });
          await this.props.addCurrency(currenciesQuery.data.currencies);
          const categoriesQuery = await client.query({
            query: LOAD_CATEGORIES,
          });
          await this.props.addCategory(categoriesQuery.data.categories);
          if (
            this.props.currentCurrency === null &&
            this.props.currencies !== null
          ) {
            await this.props.setCurrency(this.props.currencies[0]);
          } else {
            return false;
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }

  render() {
    // ./ page is being redirected to the index 0 category

    const pathArr = Object.entries(this.props.categories);

    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <NavBar />
            {this.props.overlayState !== 0 ? (
              <div className="modal__overlay" />
            ) : (
              false
            )}
            <div className="content">
              <Switch>
                {pathArr.length !== 0
                  ? pathArr.map((elem) => {
                      return (
                        <Route key={elem} exact path={`/${elem[1].name}`}>
                          <CategoryPage category={elem[1].name} />
                        </Route>
                      );
                    })
                  : false}

                {pathArr.length !== 0 ? (
                  <Route exact path="/">
                    <Redirect to={`/${pathArr[0][1].name}`} />
                  </Route>
                ) : (
                  false
                )}

                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/product/:id" component={PDP} />
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

// {this.props.overlayState !== 0 ? (<div className="modal__overlay" />) : false}

const mapStateToProps = (state) => {
  return {
    categories: state.shop.categories,
    currencies: state.shop.currencies,
    currentCurrency: state.shop.currentCurrency,
    overlayState: state.shop.overlayState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (category) => dispatch(setActiveCategory(category)),
    addCategory: (category) => dispatch(addCategory(category)),
    addCurrency: (currency) => dispatch(addCurrency(currency)),
    addToCategory: (category, data) => dispatch(addToCategory(category, data)),
    setCurrency: (currency) => dispatch(setCurrency(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
