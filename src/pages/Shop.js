import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../services/actions/actions";
import ProductCard from "../components/ProductCard";
import { Navigate, useNavigate } from "react-router-dom";
import { getCategories } from "../services/reducers/CategoriesSlice";
import { getProducts } from "../services/reducers/productsSlice";

const Shop = () => {
    
    const dispatch = useDispatch();
    const onAddToCart = (product) =>{
        dispatch(addToCart(product)); //dispatch action addTocart
    }

    // const onAddToWishlist = (product) =>{
    //     dispatch(addToWishlist(product)); //dispatch action addTocart
    // }

    const onChangeCat = (event) =>{
        dispatch(getProducts(event.target.value));
    }

    const onChangeSort = (event) =>{
        dispatch(getProducts(event.target.value));
    }
    
    const authUser = JSON.parse(localStorage.getItem('persist:persist-root'));
    //console.log(authUser);

    const {userInfo,success} = useSelector((state) => state.authUser);
    const navigate = useNavigate();
    useEffect(()=> {
        if (userInfo) {
            dispatch(getProducts('')); //dispatch action onload page 
            dispatch(getCategories()); //dispatch action onload page 
        }else{
            navigate('/login')
        }
    },[])

    const {products, loading } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);

        if (!userInfo) {
            return <Navigate replace to="/login" />;
        } else {
            return(
                <>
                <section className="wrappper">
                    <div className="container">
                        <div className="row">
                            <div className="filters">
                                <div className="filter-box">
                                    {/* Loading */}
                                    {categories.loading ? (
                                        <div>Loading ...</div>
                                    ) : null}
                                    {categories.length ?
                                    <select 
                                    className="form-control"
                                    onChange={onChangeCat}>
                                        <option value=''>--Select Category--</option>
                                        {categories.map((category,i) => {
                                            return <option key={i} value={category}>{category.toUpperCase()}</option>
                                        })}
                                    </select>:''}
                                </div>
                                <div className="filter-box">
                                    <select 
                                    className="form-control"
                                    onChange={onChangeSort}>
                                        <option value=''>--Sort Order--</option>
                                        <option value="asc">ASC</option>
                                        <option value="desc">DESC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row products">
                            {loading?<div id="overlay">
                            <div id="progstat">Loading ...</div>
                            </div>:''}
                            {products?.map((product) => {  
                            return <ProductCard 
                            product={product} 
                            key={product.id} 
                            onAddToCart={onAddToCart}/>
                            })}
                        </div>
                    </div>
                </section>
                </>
        )
    }
}

export default Shop;