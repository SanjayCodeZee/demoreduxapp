import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = (props) =>{
    
    const{id,image,title,category,price } = props.product; 
    const product_title = title.slice(0, 40) + (title.length > 40 ? "..." : "");
    return (
        <>
            <div className="col-md-4 mt-5" key={id}>
                <div className="product-wrap">
                    <button className="favorites">
                    <i className="fa fa-heart-o"></i>
                    </button>
                    <img src={image} />
                    <div className="product-details">
                        <Link to={`product/${id}`}>{product_title}</Link>
                        <div className="category">{category}</div>
                        <div className="price">${price}</div>
                        <button 
                        onClick={() => props.onAddToCart(props.product)}
                        className="btn btn-default mt-2">
                        <i className="fa fa-shopping-bag"></i> Add To Cart</button>
                        {/* <button 
                        onClick="#"
                        className="btn btn-sm mt-2">
                        <i className="fa fa-heart"></i></button> */}
                    </div>
                </div>
            </div>
        </>
    )

} 

export default ProductCard;