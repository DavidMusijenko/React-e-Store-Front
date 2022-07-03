import React, { Component } from "react";
import "./ColorSelector.css";
import { connect } from "react-redux";
import { adjustAttributeCurrent } from "../../../../redux/shopping/cart-actions";

export class ColorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAttributeIndex: 0,
    };
  }
  render() {
    const attributeName = this.props.attribute.id;

    return (
      <div>
        <div className="color-selector__misc-text">
          {this.props.attribute.name}:
        </div>
        <div>
          {this.props.attribute.items.map((elem, i) => {
            return (
              <button
                style={{ background: `${elem.value}` }}
                className={
                  elem.id === "White"
                    ? `color-selector__${
                        this.state.activeAttributeIndex === i
                          ? "box-selected"
                          : "box-white"
                      }`
                    : `color-selector__box${
                        this.state.activeAttributeIndex === i ? "-selected" : ""
                      }`
                }
                key={elem.id}
                onClick={() =>
                  this.props.adjustAttributeCurrent(
                    [`${attributeName}`],
                    elem.id,
                    i
                  ) &&
                  this.setState({
                    activeAttributeIndex: i,
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
    adjustAttributeCurrent: (attribute, value, index) =>
      dispatch(adjustAttributeCurrent(attribute, value, index)),
  };
};

export default connect(null, mapDispatchToProps)(ColorSelector);
