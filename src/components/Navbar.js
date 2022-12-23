import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink  } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import Login from './Login';
import Register from './Register';
import Banner from './Banner';
import CheckoutForm from './CheckoutForm';
import { useSelector } from 'react-redux';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const Navbar = () => {
    const cartItems = useSelector((state) => state.cartItems.cartproducts);
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
                            <NavLink className="nav-link" to="/blog">Blog</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
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
            <Route path="/blog" element={<Blog/>}></Route>
            <Route path="/checkout" element={<CheckoutForm/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/product/:productId" element={<ProductDetail/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
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