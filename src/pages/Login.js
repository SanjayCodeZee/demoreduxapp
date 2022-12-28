import React,{ useState } from "react";
import './../style.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userLogin } from "../services/actions/actions";
import { useDispatch } from "react-redux";

export default function Login({isLogin,setIsLogin}) {

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
    const validateSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email Required'),     
        password: Yup.string().required("Password is required").min(4, "Password is too short - should be 4 chars minimum"),
    });  

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { values, errors, handleSubmit, handleChange, touched } = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            //console.log(values);
            const userList = JSON.parse(localStorage.getItem("userlists")) || [];
            const matchIndex = userList.findIndex(element => {
                if (element.email === values.email && element.password === values.password) {
                    return true;
                }            
                return false;
            });

            if(matchIndex !== -1){
                localStorage.setItem('authenticated',true);
                setIsLogin(true);
                dispatch(userLogin(true));
                navigate('/shop');
            }else{
                alert('Invalid User');
            }              
        },
        });

        const onClickLogout = () =>{
            localStorage.setItem('authenticated',false);
            setIsLogin(false)
            navigate('/login');
        }

        if(isLogin) {
            console.log('if-login-true');
        }else{
            console.log('if-login-false');
        }

        if (isLogin) {
            return <section className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <h1>Log Out Here</h1>  
                        <button 
                        className="btn btn-default btn-lg"
                        onClick={onClickLogout}
                        >Logout</button>         
                    </div>
                </div>
            </section>
        }else{
        return (
            <>
            <section className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <h1>Login</h1>            
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    values={values.email}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {touched.email && errors.email ? (
                                    <div style={{color:'red'}}>{errors.email}</div>
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
            </section>
            </>
        );
    }
    
}
