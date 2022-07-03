import * as actionTypes from "./cart-types";

export const addToCart = (item, attributes) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const addToCartSpecific = (item) => {
  return {
    type: actionTypes.ADD_TO_CART_SPECIFIC,
    payload: item,
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const adjustQty = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const adjustAttributeCurrent = (attribute, value, i) => {
  // changes attributes of the CurrentItem
  // which is then passed to cart by addToCartSpecific

  return {
    type: actionTypes.ADJUST_ATTRIBUTE_CURRENT,
    payload: {
      attributeID: attribute,
      attributeValue: value,
      index: i,
    },
  };
};

export const adjustAttributeCart = (attribute, value, item, i) => {
  // different logic for changing attributes from PDP page
  // as it doesn't involve CurrentItem
  return {
    type: actionTypes.ADJUST_ATTRIBUTE_CART,
    payload: {
      attributeCart: attribute,
      valueCart: value,
      itemCart: item,
      index: i,
    },
  };
};

export const setCurrency = (currency) => {
  return {
    type: actionTypes.SET_CURRENCY,
    payload: {
      currency: currency,
    },
  };
};

export const setActiveCategory = (category) => {
  return {
    type: actionTypes.SET_ACTIVE_CATEGORY,
    payload: category,
  };
};

export const addCategory = (data) => {
  return {
    type: actionTypes.ADD_CATEGORY,
    payload: data,
  };
};

export const addCurrency = (currencies) => {
  return {
    type: actionTypes.ADD_CURRENCY,
    payload: currencies,
  };
};

export const addToCategory = (category, data) => {
  return {
    type: actionTypes.ADD_TO_CATEGORY,
    payload: {
      category: category,
      data: data,
    },
  };
};

export const setOverlay = (value) => {
  return {
    type: actionTypes.SET_OVERLAY,
    payload: value,
  };
};
