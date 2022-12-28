import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
        <section className="shop-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 offset-col-md-3" >
                        <div className="cart-item-list">
                            <div className="cart-table-title mb-3"><h5>Shopping Cart</h5><span>Item - {cartItems.length}</span></div>
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
                            }):
                            <div className="cart-empty">
                                <h6>Cart Is Empty</h6>
                                <Link to="/shop" 
                                className="btn btn-default"><i className="fa fa-arrow"></i>Go To Shop</Link>
                            </div>}  
                        </div>
                    </div>
                    <div className="col-md-3 summary">
                        <div><h5>Summary</h5></div>
                        <hr/>
                        <div className="row">
                            <div className="col">ITEMS {cartItems.length}</div>
                            <div className="col text-right">&euro; {cartTotal}</div>
                        </div>
                        <div className="row">
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">&euro; {cartTotal}</div>
                        </div>
                        <Link
                        to="/checkout"
                        className="btn btn-default"
                        >CHECKOUT</Link>
                    </div>                      
                </div>
            </div>
            </section>
        </>
    )

} 

export default Cart;