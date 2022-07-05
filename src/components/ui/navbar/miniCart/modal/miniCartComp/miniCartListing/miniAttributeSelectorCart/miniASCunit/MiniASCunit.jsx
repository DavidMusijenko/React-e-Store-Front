import React, { Component } from "react";
import "./MiniASCunit.css";

import { connect } from "react-redux/es/exports";
import { adjustAttributeCart } from "../../../../../../../../../redux/shopping/cart-actions";

export class MiniASCunit extends Component {
  render() {
    const attributeName = this.props.attribute.id;
    const activeAttributeIndex =
      this.props.item.selectedAttributes[this.props.attribute.name][1];
    return (
      <div>
        <div className="mini-ASC-unit__misc-text">
          {this.props.attribute.name}:
        </div>
        <div className="mini-ASC-unit__flex-container">
          {this.props.attribute.items.map((elem, i) => {
            return (
              <div key={`${elem.id}.mini`}>
                <button
                  className={`mini-ASC-unit__box${
                    activeAttributeIndex === i ? "-active" : ""
                  }`}
                  onClick={() =>
                    this.props.adjustAttributeCart(
                      [`${attributeName}`],
                      elem.id,
                      this.props.item,
                      i
                    )
                  }
                >
                  {elem.value}
                </button>
              </div>
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

export default connect(null, mapDispatchToProps)(MiniASCunit);
