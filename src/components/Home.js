import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../services/actions/actions";
import ProductCard from "./ProductCard";

const Home = () => {
    //const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const onAddToCart = (product) =>{
        dispatch(addToCart(product)); //dispatch action addTocart
    }

    useEffect(()=> {
        //console.log('load page');
        setLoading(true);
        dispatch(fetchProducts()); //dispatch action onload page 
        setLoading(false);
        getCategories();
    },[]) 
  
    // const fetchProducts =  async () => {
    //     const url = 'https://fakestoreapi.com/products';
    //     try {
    //         setLoading(true);
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         //console.log(json);
    //         setProducts(json)
    //         setLoading(false);
    //     } catch (e) {
    //         console.log("error handling");
    //     }
    // }

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
    //console.log(products);

    return(
        <>
            <div className="container">
                <div className="row filters-row">
                    <div className="filters">
                        <div className="filter-box">
                            {categories.length ?
                            <select className="form-control">
                                <option>--Select Category--</option>
                                {categories.map((category,i) => {
                                    return <option key={i} value={category}>{category.toUpperCase()}</option>
                                })}
                            </select>:''}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="products">
                        {loading?<div>Loading...</div>:''}
                        {products?.map((product) => {  
                        return <ProductCard product={product} key={product.id} onAddToCart={onAddToCart} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;