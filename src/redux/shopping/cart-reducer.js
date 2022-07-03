import * as actionTypes from "./cart-types";

const INITIAL_STATE = {
  cart: [], //{id, title, price, currency, img, qty}
  currentItem: null,
  currentCurrency: [],
  currencies: [],
  categories: [],
  categoriesLoaded: [],
  overlayState: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // one reducer for adding default attributes' values
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      // create default attributes array
      const defaultAttributesObject = Array.from(
        item.attributes.map((elem) => ({
          [`${elem.id}`]: [elem.items[0].id, 0],
        }))
      );

      const defaultAttributes = Object.assign({}, ...defaultAttributesObject);

      // Check if item is in cart already and if has same attributes as the default ones
      const inCart = state.cart.find((product) =>
        product.id === action.payload.id ? true : false
      );

      const same = state.cart.find((product) =>
        JSON.stringify(product.selectedAttributes) ===
        JSON.stringify(defaultAttributes)
          ? true
          : false
      );

      // add with default attributes

      return {
        ...state,
        cart:
          inCart && same
            ? state.cart.map((item) =>
                item.id === action.payload.id
                  ? {
                      ...item,
                      idUnique: Math.random(), //gotta change id so every item in cart stays unique
                      qty: item.qty + 1,
                    }
                  : item
              )
            : [
                ...state.cart,
                {
                  ...item,
                  idUnique: Math.random(), //gotta change id so every item in cart stays unique
                  qty: 1,
                  selectedAttributes: defaultAttributes,
                },
              ],
      };

    // another reducer for adding specific attributes' values
    // aka add currentItem which has specific attributes already selected

    case actionTypes.ADD_TO_CART_SPECIFIC:
      const itemSpecific = action.payload;

      // Check if item is in cart already and if has same attributes as action payload
      const inCartSameSpecific = state.cart.find((product) =>
        product.id === action.payload.id &&
        JSON.stringify(product.selectedAttributes) ===
          JSON.stringify(action.payload.selectedAttributes)
          ? true
          : false
      );

      return {
        ...state,
        cart: inCartSameSpecific
          ? state.cart.map((item) =>
              item.idUnique === inCartSameSpecific.idUnique
                ? {
                    ...itemSpecific,
                    qty: item.qty + 1,
                    idUnique: Math.random(),
                  }
                : item
            )
          : [
              ...state.cart,
              {
                ...itemSpecific,
                idUnique: Math.random(), //gotta change id so every item in cart stays unique
                qty: 1,
              },
            ],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.idUnique !== action.payload.id),
      };

    case actionTypes.ADJUST_ATTRIBUTE_CURRENT:
      return Object.assign({}, state, {
        currentItem: {
          ...state.currentItem,
          selectedAttributes: {
            ...state.currentItem.selectedAttributes,
            [action.payload.attributeID]: [
              action.payload.attributeValue,
              action.payload.index,
            ],
          },
        },
      });

    case actionTypes.ADJUST_ATTRIBUTE_CART:
      // Get the item's data
      const itemCart = action.payload.itemCart;

      // construct target item to compare it to items already in cart

      const itemTargetWannabe = JSON.parse(
        JSON.stringify(action.payload.itemCart) // a workaround as it was throwing an error due to mutating state of an initial object
      );

      const itemTarget = Object.assign(
        {},
        {
          ...itemTargetWannabe,
          selectedAttributes: {
            ...itemTargetWannabe.selectedAttributes,
            [action.payload.attributeCart]: [
              action.payload.valueCart,
              action.payload.index,
            ],
          },
        }
      );

      // check for number of items with same id in cart

      const count = state.cart.filter((obj) => {
        if (obj.id === itemCart.id) {
          return true;
        }
        return false;
      }).length;

      const onlyOne = count === 1 ? true : false;

      // check if item has same attributes and same id and not same idUnique

      const sameAdj = state.cart.find((product) =>
        JSON.stringify(product.selectedAttributes) ===
          JSON.stringify(itemTarget.selectedAttributes) &&
        product.id === itemTarget.id &&
        product.idUnique !== itemCart.idUnique
          ? true
          : false
      );

      const sameAdjItem = state.cart.find(
        (product) =>
          JSON.stringify(product.selectedAttributes) ===
            JSON.stringify(itemTarget.selectedAttributes) &&
          product.id === itemTarget.id &&
          product.idUnique !== itemCart.idUnique
      );

      // find sameAdj && !sameIdUnique item's index to delete it later

      const sameAdjUniqueIndex = sameAdjItem
        ? state.cart.findIndex((object) => {
            return object.idUnique === sameAdjItem.idUnique;
          })
        : undefined;

      // making the removeFromCart action fire after this reducer is done

      return {
        // 1. if item is the only one with this id -> change attribute
        // 2. if not check if the targeted attributes are the same for each same id
        // 3. if exact match but not same idUnique - qty + qty && delete 1 item
        // 4. if not => change attribute)
        ...state,
        cart: onlyOne //item is the only one with this id
          ? state.cart.map((item) =>
              item.idUnique === action.payload.itemCart.idUnique
                ? {
                    ...item,
                    selectedAttributes: {
                      ...item.selectedAttributes, // 1.
                      [action.payload.attributeCart]: [
                        action.payload.valueCart,
                        action.payload.index,
                      ],
                    },
                  }
                : item
            )
          : sameAdj // 2.
          ? state.cart.splice(sameAdjUniqueIndex, 1) && //delete item by index
            state.cart.map((item) =>
              item.idUnique === action.payload.itemCart.idUnique
                ? {
                    ...item,
                    qty: item.qty + sameAdjItem.qty, // 3.

                    selectedAttributes: {
                      ...item.selectedAttributes,
                      [action.payload.attributeCart]: [
                        action.payload.valueCart,
                        action.payload.index,
                      ],
                    },
                  }
                : item
            )
          : state.cart.map((item) =>
              item.idUnique === action.payload.itemCart.idUnique // 4.
                ? {
                    ...item,
                    selectedAttributes: {
                      ...item.selectedAttributes,
                      [action.payload.attributeCart]: [
                        action.payload.valueCart,
                        action.payload.index,
                      ],
                    },
                  }
                : item
            ),
      };

    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.idUnique === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case actionTypes.SET_CURRENCY:
      return {
        ...state,
        currentCurrency: action.payload.currency,
      };
    case actionTypes.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.ADD_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
      };
    case actionTypes.ADD_TO_CATEGORY:
      return {
        ...state,
        categoriesLoaded: {
          ...state.categoriesLoaded,
          [action.payload.category]: action.payload.data,
        },
      };
    case actionTypes.SET_OVERLAY: {
      return {
        ...state,
        overlayState: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
