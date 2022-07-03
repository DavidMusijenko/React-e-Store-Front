import React, { Component } from "react";
import CartListing from "../../components/cartComp/cartListing/CartListing";
import "./Cart.css";

import { connect } from "react-redux";
import { setActiveCategory } from "../../redux/shopping/cart-actions";
import CartTotal from "../../components/cartComp/cartTotal/CartTotal";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.props.setActiveCategory("cart");
  }

  render() {
    if (this.props.cart.length === 0) {
      return (
        <div>
          <h2>CART</h2>
          {/* if cart empty  */}

          <div className="cart__empty">
            <h4>Your cart is empty ¯\_(ツ)_/¯</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>CART</h2>
          <div>
            <div>
              {this.props.cart.map((item) => {
                return <CartListing key={item.idUnique} product={item} />;
              })}
            </div>
            <div>
              <CartTotal />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (category) => dispatch(setActiveCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
