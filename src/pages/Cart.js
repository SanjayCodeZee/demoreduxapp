import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../services/actions/actions";

export const Cart = () =>{
    const {numberCart, Carts} = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();
    
    // const countDuplicateCreateUniqueObject = (arr) => {
    //     const res = {};
    //     arr.forEach((obj) => {
    //       var key = JSON.stringify(obj);
    //        if (!res[key]) {           
    //          res[key] = { ...obj, count: 0 };
    //        };
    //        res[key].count += 1;
    //     });
    //     return Object.values(res);
    // }
    //const cartItems = countDuplicateCreateUniqueObject(Carts);

    const cartTotal = Carts.reduce((sum,cartitem)=> sum+=(cartitem.price*cartitem.quantity),0 );

    const onRemoveFromCart = (productid) => {
        dispatch(removeFromCart(productid));
    }
    
    const qtyHandleChange = event => {
        console.log(event.target.value);
    };

    return (
        <>
        <section className="shop-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 offset-col-md-3" >
                        <div className="cart-item-list">
                            <div className="cart-table-title mb-3">
                                <h5>Shopping Cart</h5>
                                <span>Item - {numberCart}</span>
                            </div>
                            {Carts.length > 0 ? Carts.map((cartitem,key)=>{
                            return (
                                <>
                                <div className="row cart-item-row" key={cartitem.id}>
                                    <div className="col-md-3">
                                        <div className="cart-image">
                                            <img src={cartitem.image} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <Link 
                                        to={`/shop/product/${cartitem.id}`}
                                        className="cart-itemname"><b>{cartitem.title}{key}</b></Link>
                                        <div className="cart-catname">{cartitem.category}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="cart-qty">
                                            <button 
                                            className="btn-qty"
                                            onClick={()=> dispatch(increaseQuantity(key)) }>+</button>
                                            <span>{cartitem.quantity}</span>
                                            {/* <input 
                                            type="text"
                                            className="qty-input"
                                            value={cartitem.quantity}
                                            onChange={qtyHandleChange} /> */}
                                            <button 
                                            className="btn-qty"
                                            onClick={()=> dispatch(decreaseQuantity(key)) }>-</button>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="cart-itemname"><b>${cartitem.price}</b></div>
                                    </div>
                                    <div className="col-md-1">
                                        <button 
                                        className="cart-remove"
                                        onClick={() => onRemoveFromCart(key)}> <i className="fa fa-trash"></i> </button>
                                    </div>
                                </div>
                                </>
                            )
                            }):
                            <div className="cart-empty">
                                <h6>Cart Is Empty</h6>
                                <Link to="/shop" 
                                className="btn btn-default"><i className="fa fa-arrow"></i>Go To Shop</Link>
                            </div>}  
                            {Carts.length > 0 ?
                            <div className="row cart-item-row">
                                <div className="col-md-3 offset-md-3"></div>
                                <div className="col-md-3"><b>Total</b></div>
                                <div className="col-md-2"><b>${cartTotal.toFixed(2)}</b></div>
                                <div className="col-md-1"></div>
                            </div>:''}
                        </div>
                    </div>
                    <div className="col-md-3 summary">
                        <div><h5>Summary</h5></div>
                        <hr/>
                        <div className="row">
                            <div className="col">ITEMS {numberCart}</div>
                            <div className="col text-right">$ {cartTotal.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">$ {cartTotal.toFixed(2)}</div>
                        </div>
                        <Link
                        to="/checkout"
                        className="btn btn-default"
                        >Proceed Checkout</Link>
                    </div>                      
                </div>
            </div>
        </section>
        </>
    )

} 

export default Cart;