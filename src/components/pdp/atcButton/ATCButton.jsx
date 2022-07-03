import React, { Component } from "react";
import "./ATCButton.css";
import { connect } from "react-redux/es/exports";
import { addToCartSpecific } from "../../../redux/shopping/cart-actions";

export class ATCButton extends Component {
  render() {
    return (
      <button
        className="ATC-button"
        onClick={() => this.props.addToCartSpecific(this.props.currentItem)}
      >
        ADD TO CART
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartSpecific: (item) => dispatch(addToCartSpecific(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ATCButton);
