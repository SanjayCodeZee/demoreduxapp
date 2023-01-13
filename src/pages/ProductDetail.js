import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { addToCart,removeFromCart } from "../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export const ProductDetail = (props) =>{
    const {productId} = useParams();
    const [curProduct,setCurProduct] = useState({});

    // useEffect(()=>{
    //     fetch(`https://fakestoreapi.com/products/${productId}`)
    //         .then(res=>res.json())
    //         .then(json=>setCurProduct(json));
    // },[]);

    useEffect(() => {
        async function fetchMyProduct() {
          let response = await fetch(`https://fakestoreapi.com/products/${productId}`)
          response = await response.json()
          console.log(response);
          setCurProduct(response)
        }    
        fetchMyProduct()
    }, [])

    //const cartProducts = useSelector((state) => state.cartItems.cartproducts);
    //console.log(cartProducts);
    const dispatch = useDispatch();
    const onAddToCart = (item) =>{
        dispatch(addToCart(item));
    }

    const onremoveFromCart = (item) =>{
        dispatch(removeFromCart(item));
    }
    
    return (
        <>
        <section className="product-detail-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-image">
                            <img src={curProduct.image} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-info-wrap">
                            <div className="product-category mt-2"><h4>{curProduct.category?.toUpperCase()||''}</h4></div>                            
                            <div className="product-title mt-2"><h1>{curProduct.title}</h1></div>
                            <div className="product-price mt-2"><h3>${curProduct.price}</h3></div>
                            {curProduct.rating != undefined ?
                            <div className="product-rating mt-2">
                                <h5>Rating: {curProduct.rating.rate} <i className="fa fa-star"></i>
                                ({curProduct.rating.count})</h5>
                            </div>: ""}
                            <div className="product-description mt-2">{curProduct.description}</div>    
                            <div className="product-qty mt-3">
                                <button 
                                className="btn btn-sm btn-qty"
                                onClick={()=> onremoveFromCart(curProduct.id)}>-</button>
                                <input 
                                type="text" 
                                value="1"
                                onChange={()=> console.log('chnage') }  />
                                <button 
                                className="btn btn-sm btn-qty"
                                onClick={()=> onAddToCart(curProduct)}>+</button>
                            </div>
                            <button 
                            onClick={()=> onAddToCart(curProduct)}
                            className="btn btn-default mt-3" >
                            <i className="fa fa-cart-plus"></i> Add To Cart</button>
                            <Link to='/cart' className="btn btn-goto-cart mt-3"> Go to Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )

} 

export default ProductDetail;


