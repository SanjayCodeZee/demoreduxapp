import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = (props) =>{
    
    const{id,image,title,category,price } = props.product; 
    return (
        <>
            <div className="col-md-3 product" key={id}>
                <img src={image} />
                <div className="product-details">
                    <Link to={`product/${id}`}>{title}</Link>
                    <div className="category">{category}</div>
                    <div className="price">${price}</div>
                    <button 
                    onClick={() => props.onAddToCart(props.product)}
                    className="btn btn-default">Add To Cart</button>
                </div>
            </div>
        </>
    )

} 

export default ProductCard;