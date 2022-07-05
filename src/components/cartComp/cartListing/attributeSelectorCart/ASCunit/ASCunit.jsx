import React, { Component } from "react";
import "./ASCunit.css";

import { connect } from "react-redux/es/exports";
import { adjustAttributeCart } from "../../../../../redux/shopping/cart-actions";

export class ASCunit extends Component {
  render() {
    const attributeName = this.props.attribute.id;
    const activeAttributeIndex =
      this.props.item.selectedAttributes[this.props.attribute.name][1];
    return (
      <div>
        <div className="ASCunit__misc-text">{this.props.attribute.name}:</div>
        <div>
          {this.props.attribute.items.map((elem, i) => {
            return (
              <button
                className={`ASCunit__box${
                  activeAttributeIndex === i ? "-active" : ""
                }`}
                key={elem.id}
                onClick={() =>
                  this.setState({
                    ...this.prevState,
                    [`${attributeName}`]:
                      elem.id &&
                      this.props.adjustAttributeCart(
                        [`${attributeName}`],
                        elem.id,
                        this.props.item,
                        i
                      ),
                  })
                }
              >
                {elem.value}
              </button>
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

export default connect(null, mapDispatchToProps)(ASCunit);
