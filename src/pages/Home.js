import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../services/reducers/CategoriesSlice";
import CategoryBox from "../components/CategoryBox";
//const CategoryBox = React.lazy(() => import('../components/CategoryBox'));
import Banner from '../components/Banner';

const Home = () => {
    
    const dispatch = useDispatch();    
    useEffect(()=>{
        dispatch(getCategories());
    },[]);

    const {categories, loading} = useSelector((state) => state.categories);
    return(
        <>
        <Banner/>
        <section className="home-detail-wrapper">
            <div className="container">
                <div className="row">
                    <div className="text-center fw-bolder mb-5">
                        <h2>Categories</h2>
                    </div>
                    {/* <Suspense fallback={<div className="loader">Loading...</div>}> */}
                    {loading?<div className="loader">Loading ...</div>:''}
                    {categories.map((category,i) => {
                        return <CategoryBox category={category} key={i} />                      
                    })}
                    {/* </Suspense> */}
                </div>
            </div>
        </section>
        </>
    )
}

export default Home;