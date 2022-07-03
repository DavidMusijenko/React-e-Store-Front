import { combineReducers } from "redux";

import cartReducer from "./shopping/cart-reducer";

const rootReducer = combineReducers({
  shop: cartReducer,
});

export default rootReducer;
