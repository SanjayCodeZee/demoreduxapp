import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink,Navigate  } from 'react-router-dom';
import Home from '../pages/Home';
import Blog from './Blog';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Banner from './Banner';
import CheckoutForm from '../pages/CheckoutForm';
import { useSelector } from 'react-redux';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Footer from './Footer';
import Shop from '../pages/Shop';

const Navbar = () => {
    const cartItems = useSelector((state) => state.cartItems.cartproducts);
    const authUser = useSelector((state) => state.authUser);
    console.log('author',authUser);
    const [isLogin, setIsLogin] = useState(localStorage.getItem("authenticated") || false);

    return (
        <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">CODE<span className='logotext'>ZEE</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="menu">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/shop">Shop</NavLink>
                            </li>
                            <li className="nav-item">
                            {!isLogin ?
                            <NavLink className="nav-link" to="/login">Login</NavLink>:
                            <NavLink className="nav-link" to="/login">Logout</NavLink>}
                            </li>
                            {!isLogin?<li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>:''}
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/cart">
                                <i className="fa fa-shopping-basket">
                                {cartItems.length > 0 ? 
                                <span className='badge cart-badge' id="lblCartCount">{cartItems.length}</span>:''}
                                </i>                                
                            </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Banner/>
        <Routes>
            <Route path="/" exact={true} element={<Home/>}></Route>
            <Route path="/shop" element={<Shop isLogin={isLogin} />}></Route>
            <Route path="/checkout" element={<CheckoutForm isLogin={isLogin}/>}></Route>
            <Route path="/login" element={<Login setIsLogin={setIsLogin} isLogin={isLogin}/>}></Route>
            <Route path="/register" element={<Register isLogin={isLogin}/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/blog" element={<Blog/>}></Route>
            <Route path="/product/:productId" element={<ProductDetail/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
        <Footer/>
        </BrowserRouter>
        
    );
}

function PageNotFound() {
    return (<div>
      <h1>404 Page</h1>
      <p>This is Not found</p>
    </div>)
  }

export default Navbar;