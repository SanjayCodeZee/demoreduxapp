import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../services/reducers/authSlice";

const Navbar = () => {
    const {numberCart} = useSelector((state) => state.cartItems);
    const {userInfo} = useSelector((state) => state.authUser);
    //console.log('author',userInfo);
    const dispatch = useDispatch();

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>Code<span className='logotext'>ZEE</span></Link>
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
                            <NavLink className="nav-link" aria-current="page" to="/todoList">TodoList</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/shop">Shop</NavLink>
                                {/* <ul className="submenu">
                                    <li><Link to="/cart">Profile</Link></li>
                                    <li><Link to="/cart">Profile</Link></li>
                                    <li><Link to="/cart">Profile</Link></li>
                                    <li><Link to="/cart">Profile</Link></li>
                                    <li><Link to="/cart">Profile</Link></li>
                                </ul> */}
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/cart">
                                <i className="fa fa-shopping-bag" aria-hidden="true">
                                <span className='badge cart-badge' id="lblCartCount">{numberCart}</span>
                                </i>                                
                            </NavLink>
                            </li>
                            {!userInfo?
                            <li className='nav-item'>
                            <NavLink className="nav-link" to="/register">
                            <i className="fa fa-user-plus" aria-hidden="true"></i> Register</NavLink>
                            </li>:''}
                            <li className="nav-item">
                            {!userInfo?
                            <NavLink className="nav-link" to="/login">
                            <i className="fa fa-user" aria-hidden="true"></i> Login</NavLink>:
                            <NavLink 
                            onClick={()=> dispatch(logout()) }
                            className="nav-link" 
                            to="/login"
                            ><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</NavLink>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </>
        
    );
}


export default Navbar;