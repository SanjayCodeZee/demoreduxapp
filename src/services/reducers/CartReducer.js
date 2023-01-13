import { ADD_TO_CART, DECREASE_QUANTITY, GET_NUMBER_CART,INCREASE_QUANTITY,REMOVE_FROM_CART } from "../reduxConstant";

const initialState = {
    numberCart:0,
    Carts : []
}

export const cartReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_NUMBER_CART:
            return{
                ...state
            }
        case ADD_TO_CART:
            if(state.numberCart==0){
                let cart = {
                    ...action.payload,
                    quantity:1
                }
                state.Carts.push(cart)
            }else{
                let check = false;
                state.Carts.map((item,i)=>{
                    if(item.id === action.payload.id){
                        state.Carts[i].quantity++
                        check = true
                    }
                })

                if(!check){
                    state.Carts.push({
                        ...action.payload,
                        quantity:1
                    })
                }
            }
            return {
                ...state,
                numberCart: state.numberCart+1
            }
        case REMOVE_FROM_CART:
            let _quantity = state.Carts[action.payload].quantity;
            return{
                ...state,
                numberCart:state.numberCart - _quantity,
                Carts:state.Carts.filter(item=>{
                    return item.id!=state.Carts[action.payload].id
                })
               
            }
        case INCREASE_QUANTITY:
            console.log('----increase------',action.payload);
            state.numberCart++
            state.Carts[action.payload].quantity++;
            
            return{
                ...state
            }
        case DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity;
            if(quantity>1){
                state.numberCart--;
                state.Carts[action.payload].quantity--;
            }
            
            return{
                ...state
            }
        default: return state;
    }
}