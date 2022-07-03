import React, { Component } from "react";
import { connect } from "react-redux";
import MiniASCunit from "./miniASCunit/MiniASCunit";
import MiniColorSelectorCart from "./colorSelectorCart/MiniColorSelectorCart";

export class MiniAttributesSelectorCart extends Component {
  render() {
    const attributes = this.props.product.attributes;

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
                <MiniASCunit
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
                <MiniColorSelectorCart
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
              <MiniASCunit
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

export default connect(mapStateToProps)(MiniAttributesSelectorCart);
