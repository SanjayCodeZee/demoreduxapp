import { ADD_TO_CART, REMOVE_FROM_CART,SET_PRODUCTS } from "../reduxConstant"

export const addToCart = (products) =>{
    return {
        type : ADD_TO_CART,
        payload : products
    }
}

export const removeFromCart = (productid) =>({
    type : REMOVE_FROM_CART,
    payload: productid
})

export const fetchProducts = () =>{
    return async function (dispatch) { 
        //Redux thunk middleware call this function use dispatch as first argument
        const url = 'https://fakestoreapi.com/products';
        try {
            const response = await fetch(url);
            const json = await response.json();
            //console.log(json);
            dispatch(setProducts(json)) 
        } catch (e) {
            console.log("error handling");
        }
    }
}

// Note :  fetchProducts() ma dispatch action kre che setProduct and 

export const setProducts = (products) =>{
    return {
        type : SET_PRODUCTS,
        payload : products
    }
}
