import React from "react";
import { useParams,Link } from "react-router-dom";

export const ProductDetail = (props) =>{
    const {productId} = useParams()
    return (
        <>
            <div className="col-md-3 product" key={productId}>
                Hello World {productId}
            </div>
        </>
    )

} 

export default ProductDetail;