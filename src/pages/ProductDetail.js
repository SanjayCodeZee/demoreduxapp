import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { addToCart } from "../services/actions/actions";
import { useDispatch } from "react-redux";

export const ProductDetail = (props) =>{
    const {productId} = useParams();
    const [curProduct,setCurProduct] = useState({});

    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res=>res.json())
            .then(json=>setCurProduct(json));
    },[]);

    console.log(curProduct);
    const dispatch = useDispatch();
    const onAddToCart = (item) =>{
        dispatch(addToCart(item));
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
                            <div className="product-title mt-2"><h4>{curProduct.title}</h4></div>
                            <div className="product-category mt-2">{curProduct.category}</div>                            
                            <div className="product-price mt-2">${curProduct.price}</div>
                            <div className="product-qty mt-2">
                                <select className="form-control">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <button 
                            onClick={()=> onAddToCart(curProduct)}
                            className="btn btn-default mt-3" >
                            <i className="fa fa-cart-plus"></i> Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )

} 

export default ProductDetail;


