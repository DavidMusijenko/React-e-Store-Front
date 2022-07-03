import React, { Component } from "react";
import "./QuantitySelector.css";
import { connect } from "react-redux";
import {
  adjustQty,
  removeFromCart,
} from "../../../../redux/shopping/cart-actions";

export class CartSelector extends Component {
  state = {
    product: this.props.product,
  };

  /* check if qty = 1 and render minus button accordingly*/

  render() {
    let minus;
    if (this.props.product.qty === 1) {
      minus = (
        <button
          className="quantity-selector__minus"
          onClick={() => {
            this.props.removeFromCart(this.props.product.idUnique);
          }}
        />
      );
    } else {
      minus = (
        <button
          className="quantity-selector__minus"
          onClick={() => {
            this.props.adjustQty(
              this.props.product.idUnique,
              this.props.product.qty - 1
            );
          }}
        />
      );
    }
    return (
      <div className="quantity-selector__plus-minus-input">
        <div>
          <button
            className="quantity-selector__plus"
            onClick={() => {
              this.props.adjustQty(
                this.props.product.idUnique,
                this.props.product.qty + 1
              );
            }}
          ></button>
        </div>
        <div
          className="quantity-selector__input-group"
          type="number"
          name="quantity"
        >
          {this.props.product.qty}
        </div>
        <div>{minus}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, qty) => dispatch(adjustQty(id, qty)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartSelector);
