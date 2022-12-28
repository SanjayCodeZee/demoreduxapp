import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts, fetchByCategoryProducts } from "../services/actions/actions";
import ProductCard from "../components/ProductCard";

const Home = () => {
    
    return(
        <>
            <div className="container">
                <div className="row">
                    <section className="home-detail-wrapper">
                        <h1>Home Page</h1>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home;