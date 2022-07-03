import React, { Component } from "react";
import "./MiniColorSelectorCart.css";
import { connect } from "react-redux";
import { adjustAttributeCart } from "../../../../../../../../../redux/shopping/cart-actions";

export class MiniColorSelectorCart extends Component {
  render() {
    const attributeName = this.props.attribute.id;
    const activeAttributeIndex =
      this.props.item.selectedAttributes[this.props.attribute.name][1];

    return (
      <div>
        <div className="mini-color-selector-cart__MiscText">
          {this.props.attribute.name}:
        </div>
        <div className="mini-color-selector-cart__flex-container">
          {this.props.attribute.items.map((elem, i) => {
            return (
              <button
                style={{ background: `${elem.value}` }}
                className={
                  elem.id === "White"
                    ? `mini-color-selector-cart__color${
                        activeAttributeIndex === i
                          ? "-box-selected"
                          : "-box-white"
                      }`
                    : `mini-color-selector-cart__color-box${
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
                  )
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

export default connect(null, mapDispatchToProps)(MiniColorSelectorCart);
