import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart } from "../services/actions/actions";

export const Cart = () =>{
    const cartProducts = useSelector((state) => state.cartItems.cartproducts);
    const dispatch = useDispatch();
    // const cartItems = {};    
    // cartProducts.forEach(function(obj) {
    //     var key = JSON.stringify(obj)
    //     cartItems[key] = (cartItems[key] || 0) + 1
    // })
    
    const [subtotal,setSubTotal] = useState('');
    const qty = [1,2,3,4,5,6,7];

    const countDuplicateCreateUniqueObject = (arr) => {
        const res = {};
        arr.forEach((obj) => {
          var key = JSON.stringify(obj);
           if (!res[key]) {           
             res[key] = { ...obj, count: 0 };
           };
           res[key].count += 1;
        });
        return Object.values(res);
    }
    const cartItems = countDuplicateCreateUniqueObject(cartProducts);

    const cartTotal = cartItems.reduce((sum,cartitem)=> sum+=(cartitem.price*cartitem.count),0 );

    const onRemoveFromCart = (productid) => {
        dispatch(removeFromCart(productid));
    }
    
    const qtyHandleChange = event => {
        console.log(event.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-9 offset-col-md-3" >
                        <div className="cart-table-title"><h5>Shopping Cart</h5><span>Item - {cartItems.length}</span></div>
                        {cartItems.length > 0 ? cartItems.map((cartitem)=>{
                        return (
                            <>
                            <div className="row cart-item-row" key={cartItems.id}>
                                <div className="col-md-3">
                                    <div className="cart-image">
                                        <img src={cartitem.image} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="cart-itemname"><b>{cartitem.title}</b></div>
                                    <div className="cart-catname">{cartitem.category}</div>
                                </div>
                                <div className="col-md-2">
                                    <div className="cart-itemname"><b>${cartitem.price}</b></div>
                                </div>
                                <div className="col-md-1">
                                    <div className="cart-qty">
                                        <select 
                                        value={cartitem.count}
                                        onChange={qtyHandleChange}
                                        className="form-control">
                                        {qty.map((ele)=> 
                                            <option 
                                            value={ele}
                                            //selected={cartitem.count===ele??'selected'}
                                            >
                                            {ele}
                                            </option>) }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <button 
                                    className="cart-remove"
                                    onClick={() => onRemoveFromCart(cartitem.id)}> <i className="fa fa-trash"></i> </button>
                                </div>
                            </div>
                            </>
                        )
                        }):<div><h5><b>Cart Is Empty</b></h5></div>}  
                    </div>
                    <div className="col-md-3 summary">
                        <div><h5>Summary</h5></div>
                        <hr/>
                        <div className="row">
                            <div className="col">ITEMS 3</div>
                            <div className="col text-right">&euro; {cartTotal}</div>
                        </div>
                        <div className="row">
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">&euro; {cartTotal}</div>
                        </div>
                        <button className="btn btn-default">CHECKOUT</button>
                    </div>                      
                </div>
            </div>
        </>
    )

} 

export default Cart;