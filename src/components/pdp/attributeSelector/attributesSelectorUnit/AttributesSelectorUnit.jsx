import React, { Component } from "react";
import "./AttributesSelectorUnit.css";

import { connect } from "react-redux/es/exports";
import { adjustAttributeCurrent } from "../../../../redux/shopping/cart-actions";

export class AttributesSelectorUnit extends Component {
  render() {
    const attributeName = this.props.attribute.id;

    // had to add ternary operator as the currentItem default parameters in Redux are filled
    // after this render

    let activeAttributeIndex;
    if (this.props.currentItem.selectedAttributes) {
      activeAttributeIndex =
        this.props.currentItem.selectedAttributes[this.props.attribute.name][1];
    } else {
      return false;
    }

    return (
      <div>
        <div className="attribute-selector-unit__misc-text">
          {this.props.attribute.name}:
        </div>
        <div>
          {this.props.attribute.items.map((elem, i) => {
            return (
              <button
                className={`attribute-selector-unit__box${
                  activeAttributeIndex === i ? "-active" : ""
                }`}
                key={elem.id}
                onClick={() =>
                  this.props.adjustAttributeCurrent(
                    [`${attributeName}`],
                    elem.id,
                    i
                  )
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

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustAttributeCurrent: (attribute, value, i) =>
      dispatch(adjustAttributeCurrent(attribute, value, i)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributesSelectorUnit);
