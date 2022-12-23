import React from "react";
import './../style.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from "react-router-dom";

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
    const validateSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email Required'),     
        password: Yup.string().required("Password is required").min(4, "Password is too short - should be 4 chars minimum"),
    });  

    const { values, errors, handleSubmit, handleChange, touched } = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
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
