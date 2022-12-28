import { combineReducers } from "redux";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./CartReducer";
import { productlistReducer } from "./productSlice";
import { authReducer } from "./AuthReducer";

const rootReducer = combineReducers({
  //productlist : productlistReducer,
  products: productReducer,
  cartItems: cartReducer,
  authUser: authReducer
});

export default rootReducer;