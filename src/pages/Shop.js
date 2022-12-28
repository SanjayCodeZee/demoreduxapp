import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts, fetchByCategoryProducts } from "../services/actions/actions";
import ProductCard from "../components/ProductCard";
import { Navigate } from "react-router-dom";

const Shop = ({isLogin}) => {
    
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const onAddToCart = (product) =>{
        dispatch(addToCart(product)); //dispatch action addTocart
    }

    const onChangeFilter = (event) =>{
        dispatch(fetchByCategoryProducts(event.target.value));
    }

    useEffect(()=> {
        //console.log('load page');
        setLoading(true);
        dispatch(fetchProducts()); //dispatch action onload page 
        setLoading(false);
        getCategories();
    },[])

    const getCategories =  async () => {
        const url = 'https://fakestoreapi.com/products/categories';
        try {
            const response = await fetch(url);
            const json = await response.json();
            //console.log(json);
            setCategories(json);
        } catch (e) {
            console.log("error handling");
        }
    }
    const products = useSelector((state) => state.products);
    const authUser = useSelector((state) => state.authUser);
    console.log('author',authUser);
        if (!isLogin) {
            return <Navigate replace to="/login" />;
        } else {
            return(
                <>
                    <div className="container">
                        <div className="row filters-row">
                            <div className="filters">
                                <div className="filter-box">
                                    {categories.length ?
                                    <select 
                                    className="form-control"
                                    onChange={onChangeFilter}>
                                        <option>--Select Category--</option>
                                        {categories.map((category,i) => {
                                            return <option key={i} value={category}>{category.toUpperCase()}</option>
                                        })}
                                    </select>:''}
                                </div>
                            </div>
                        </div>
                        <div className="row products">
                                {loading?<div id="overlay">
                                <div id="progstat">Loading ...</div>
                                </div>:''}
                                {products?.map((product) => {  
                                return <ProductCard product={product} key={product.id} onAddToCart={onAddToCart} />
                            })}
                        </div>
                    </div>
                </>
        )
    }
}

export default Shop;