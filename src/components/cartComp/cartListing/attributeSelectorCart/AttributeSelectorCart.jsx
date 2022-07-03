import React, { Component } from "react";
import { connect } from "react-redux";
import ASCunit from "./ASCunit/ASCunit";
import ColorSelectorCart from "./colorSelectorCart/ColorSelectorCart";

export class AttributesSelectorCart extends Component {
  render() {
    const attributes = this.props.product.attributes;

    // map possible attributes with corresponding possible values

    // search for swatch attribute

    const swatchPresent = attributes.find((item) =>
      item.type === "swatch" ? true : false
    );
    const swatchArr = [swatchPresent];

    //construct array of objects of attributes without the swatch attribute

    const swatchArrIndex = attributes.indexOf(swatchPresent);
    const newAttributesObj = JSON.parse(
      JSON.stringify(Object.assign({}, attributes))
    );
    delete newAttributesObj[`${swatchArrIndex}`];
    const newAttributesArr = Object.values(newAttributesObj);

    if (swatchPresent) {
      return (
        <div>
          <div>
            {newAttributesArr.map((el, i) => {
              return (
                <ASCunit
                  key={el.id}
                  attribute={el}
                  attributes={attributes}
                  item={this.props.product}
                  index={i}
                />
              );
            })}
          </div>
          <div>
            {swatchArr.map((elem, i) => {
              return (
                <ColorSelectorCart
                  key={elem.id}
                  attribute={elem}
                  attributes={attributes}
                  item={this.props.product}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {attributes.map((el, i) => {
            return (
              <ASCunit
                key={el.id}
                attribute={el}
                attributes={attributes}
                item={this.props.product}
                index={i}
              />
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(AttributesSelectorCart);
