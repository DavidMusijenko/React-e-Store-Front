import React, { Component } from "react";
import "./ColorSelectorCart.css";
import { connect } from "react-redux";
import { adjustAttributeCart } from "../../../../../redux/shopping/cart-actions";

export class ColorSelectorCart extends Component {
  render() {
    const attributeName = this.props.attribute.id;
    const activeAttributeIndex =
      this.props.item.selectedAttributes[this.props.attribute.name][1];

    return (
      <div>
        <div className="color-selector-cart__misc-text">
          {this.props.attribute.name}:
        </div>
        <div>
          {this.props.attribute.items.map((elem, i) => {
            return (
              <button
                style={{ background: `${elem.value}` }}
                className={
                  elem.id === "White"
                    ? `color-selector-cart__${
                        activeAttributeIndex === i
                          ? "box-selected"
                          : "box-white"
                      }`
                    : `color-selector-cart__box${
                        activeAttributeIndex === i ? "-selected" : ""
                      }`
                }
                key={elem.id}
                onClick={() =>
                  this.props.adjustAttributeCart(
                    [`${attributeName}`],
                    elem.id,
                    this.props.item,
                    i
                  ) &&
                  this.setState({
                    colorActive: i,
                  })
                }
              ></button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustAttributeCart: (attribute, value, item, i) =>
      dispatch(adjustAttributeCart(attribute, value, item, i)),
  };
};

export default connect(null, mapDispatchToProps)(ColorSelectorCart);
