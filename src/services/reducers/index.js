import { combineReducers } from "redux";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./CartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer
});

export default rootReducer;