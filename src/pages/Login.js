import React,{ useState, useEffect } from "react";
import './../style.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../services/reducers/authSlice";

export default function Login() {

    /*1.using with useformik hook and custom validate (not use yup)
    validate
    */
    // const validate = (values) => {
    //     let errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if (!values.email) {
    //       errors.email = 'Email is required';
    //     } else if (!regex.test(values.email)) {
    //       errors.email = 'Invalid Email';
    //     }
    //     if (!values.password) {
    //       errors.password = 'Password is required';
    //     } else if (values.password.length < 4) {
    //       errors.password = 'Password too short';
    //     }
    //     return errors;
    //   };
    /*
    2.using yup and validateschema for field */
    const {userInfo,success} = useSelector((state) => state.authUser);
    const validateSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),     
        password: Yup.string().required("Password is required").min(4, "Password is too short - should be 4 chars minimum"),
    });  

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // userToken = localStorage.getItem('userToken');
    useEffect(() => {
        console.log('load Login page ...............');
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/shop')
    }, [navigate,userInfo]);


    const { values, errors, handleSubmit, handleChange, touched } = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            console.log('Onsubmit load page ...............');
            //const userList = JSON.parse(localStorage.getItem("userlists")) || [];
            dispatch(loginUser(values));
        },
        });

        return (
            <>
            <section className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="loging-content">
                                <div className="login-title"><h3>Login</h3></div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            values={values.username}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter Your username"
                                        />
                                        {touched.username && errors.username ? (
                                            <div style={{color:'red'}}>{errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            values={values.password}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter Your Password"
                                        />
                                        {touched.password && errors.password ? (
                                            <div style={{color:'red'}}>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                                <div className="row"><Link to="/register" className="link-form">Create Account</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );    
}
