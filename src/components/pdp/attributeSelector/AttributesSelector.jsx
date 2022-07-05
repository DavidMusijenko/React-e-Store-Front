import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/shopping/cart-actions";
import AttributesSelectorUnit from "./attributesSelectorUnit/AttributesSelectorUnit";
import ColorSelector from "./colorSelector/ColorSelector";
import { adjustAttributeCurrent } from "../../../redux/shopping/cart-actions";

export class AttributesSelector extends Component {
  render() {
    const attributes = this.props.currentItem.attributes;
    console.log(attributes);

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
                <AttributesSelectorUnit
                  key={el.id}
                  attribute={el}
                  attributes={attributes}
                  index={i}
                />
              );
            })}
          </div>
          <div>
            {swatchArr.map((elem, i) => {
              return (
                <ColorSelector
                  key={elem.id}
                  attribute={elem}
                  attributes={attributes}
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
              <AttributesSelectorUnit
                key={el.id}
                attribute={el}
                attributes={attributes}
                index={i}
              />
            );
          })}
        </div>
      );
    }
  }

  //setting default attributes for CurrentItem

  componentDidMount() {
    this.props.currentItem.attributes.map((elem) => {
      return this.props.adjustAttributeCurrent(
        `${elem.id}`,
        `${elem.items[0].id}`,
        0
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    adjustAttributeCurrent: (attribute, value, i) =>
      dispatch(adjustAttributeCurrent(attribute, value, i)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributesSelector);
