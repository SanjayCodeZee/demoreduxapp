import { ADD_PRODUCT_IN_WISHLIST, ADD_TO_CART, DECREASE_QUANTITY, GET_NUMBER_CART, INCREASE_QUANTITY, REMOVE_FROM_CART,SET_CATEGORIES,SET_PRODUCTS, USER_LOGIN } from "../reduxConstant"

export function GetNumberCart(){
    return{
        type: GET_NUMBER_CART
    }
}

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

export const increaseQuantity = (payload) =>{
    return {
        type : INCREASE_QUANTITY,
        payload
    }
}

export const decreaseQuantity = (payload) =>({
    type : DECREASE_QUANTITY,
    payload
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

export const fetchByCategoryProducts = (category) =>{
    return async function (dispatch) { 
        //Redux thunk middleware call this function use dispatch as first argument
        let url = `https://fakestoreapi.com/products/category/${category}`;
        if(category === ''){
            url = `https://fakestoreapi.com/products/`;
        }

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

export const addProductWishList = (products) =>{
    return {
        type : ADD_PRODUCT_IN_WISHLIST,
        payload : products
    }
}


export const userLogin = (user) => {
    return {
        type: USER_LOGIN,
        payload: user
    }
}