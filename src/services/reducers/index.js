import { combineReducers } from "redux";
import productReducer from "./productsSlice";
import { cartReducer } from "./CartReducer";
import categoriesSlice from "./CategoriesSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer,
  categories : categoriesSlice,
  authUser: authSlice,
});

export default rootReducer;