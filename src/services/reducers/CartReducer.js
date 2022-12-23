import { ADD_TO_CART, REMOVE_FROM_CART } from "../reduxConstant";

const initialValues = {
    cartproducts : []
}

export const cartReducer = (state = initialValues, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            return {...state, cartproducts: [...state.cartproducts,action.payload]};
        case REMOVE_FROM_CART:{
            console.log('cart load',state.cartproducts);
            const products = state.cartproducts.filter(
                (item)=> item.id !== action.payload  )
            console.log('after remove',products);
            return {...state, cartproducts: products};
        }
        default: return state;
    }
}