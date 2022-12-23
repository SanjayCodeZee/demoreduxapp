import { SET_PRODUCTS } from "../reduxConstant";

const productInitialValues = [];

export const productReducer = (state = productInitialValues, action) =>{
    switch (action.type) {
        case SET_PRODUCTS:
            return [...action.payload];
        default: return state;
    }
}