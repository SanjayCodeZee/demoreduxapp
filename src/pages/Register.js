import React, { useEffect, useRef, useState } from "react";
import './../style.css';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PreviewImage from "../components/PreviewImage";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Register({isLogin}) {

    const initialValues = {
        fullname:'',
        phone:'',
        gender:'',
        date:'',
        about:'',
        qualification: '',
        email:'',
        social : [],
        password:'',
        profileimage:'',
        acceptbox: false
    }

    //const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname Required').min(3, 'Too Short!').max(70, 'Too Long!'),
        phone: Yup.number().required('mobile number is required').min(6000000000,"Invalid mobile number").max(9999999999,"Invalid mobile number"),
        gender: Yup.string().required("Gender is required"),
        date: Yup.date().required("Date is required"),
        about: Yup.string().required("About is required").min(20, 'Too Short!').max(150, 'No More Text!'),
        qualification: Yup.string().required("Select any One option"),
        email: Yup.string().email('Invalid email').required('Email Required'),
        social : Yup.array().of(
            Yup.string("String Required").min(3, 'Too Short!').max(20, 'Too Long!').required('Required')
          ).min(1,"Atleast One Social Media is Required!").required('Required'),
        password: Yup.string().required("Password is required").min(4, "Password is too short - should be 4 chars minimum"),
        profileimage: Yup.mixed().required("Image is Required"),
        acceptbox: Yup.boolean().oneOf([true], 'You need to accept the terms and conditions'),
    });

    const navigate = useNavigate();
    useEffect(()=>{
        if (isLogin) {
            console.log('islogin');
            navigate('/');
        }
    },[]);

       
        return (
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                    console.log(values);
                    const userList = JSON.parse(localStorage.getItem("userlists")) || [];
                    userList.push(values); 
                    console.log("userList ", userList);
                    localStorage.setItem("userlists",JSON.stringify(userList));
                    localStorage.setItem('authenticated',true);
                    resetForm({values: ''});
                    navigate('/shop'); // redirect to /shop
                }
            }
            >
            {({ values, errors, handleSubmit, handleChange, touched, setFieldValue })=> (
                <div className="container">
                    {/* { console.log('value',values,'error',errors)} */}
                    <div className="row contact">
                        <Form onSubmit={handleSubmit}> 
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="fullname">Full Name</label>
                                    <input type="text"
                                    name="fullname" 
                                    value={values.fullname}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter fullname"/>
                                    <ErrorMessage name="fullname" component="span" style={{color:'red'}} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="phone">Phone</label>
                                    <input type="number"
                                    name="phone" 
                                    value={values.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter phone"/>
                                    <ErrorMessage name="phone" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="row">                                
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="date">Birth Date</label>
                                    <input type="date"
                                    name="date" 
                                    value={values.date}
                                    onChange={handleChange}
                                    className="form-control"/>
                                    <ErrorMessage name="date" component="span" style={{color:'red'}} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="qualification">Qualification</label>
                                    <select 
                                    name="qualification" 
                                    value={values.qualification}
                                    onChange={handleChange}
                                    className="form-control">
                                        <option value="">--select--</option>
                                        <option value="mba">MBA</option>
                                        <option value="mca">MCA</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ErrorMessage name="qualification" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="email">Email address</label>
                                    <input type="email"
                                    name="email" 
                                    value={values.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Enter email"/>
                                    <ErrorMessage name="email" component="span" style={{color:'red'}} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="password">Password</label>
                                    <input type="password" 
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Password"/>
                                    <ErrorMessage name="password" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="mb-2" htmlFor="about">About</label>
                                    <textarea
                                    name="about" 
                                    value={values.about}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter about"/>
                                    <ErrorMessage name="about" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="row">
                            <ErrorMessage name="social" component="span" style={{color:'red'}} />
                                <div className="form-group col-md-6">
                                    <label className="mb-2">Facebook</label>
                                    <input type="text"
                                    name="social[0]" 
                                    value={values.social[0]}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter Facebook Url"/>
                                    <ErrorMessage name="social.0" component="span" style={{color:'red'}} />
                                    </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2">LinkedIn</label>
                                    <input type="text"
                                    name="social[1]" 
                                    value={values.social[1]}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter LinkedIn Url"/>
                                    <ErrorMessage name="social.1" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="mb-2" htmlFor="gender">Gender : </label>
                                    <div className="btn-radio">
                                        <input type="radio"
                                        name="gender" 
                                        value="male"
                                        onChange={handleChange}
                                        checked={values.gender === "male"}/>
                                        <label>Male</label>

                                        <input type="radio"
                                        name="gender" 
                                        value="female"
                                        onChange={handleChange}
                                        checked={values.gender === "female"}/>
                                        <label>Female</label>
                                        <ErrorMessage name="gender" component="span" style={{color:'red'}} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profileimage" className="mb-3">Profile Image</label>
                                <div className="input-file">
                                    <input type="file"
                                    name="profileimage"
                                    onChange={(event) => {
                                        setFieldValue("profileimage", event.currentTarget.files[0]);
                                    }}/>
                                    {values.profileimage ? (
                                        <PreviewImage className={{margin:'auto'}} width={100} height={100} file={values.profileimage} />
                                    ) : null}
                                    <ErrorMessage name="profileimage" component="span" style={{color:'red'}} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="acceptbox">
                                <input type="checkbox" 
                                name="acceptbox"
                                value="yes"
                                onChange={handleChange}/> I accept Terms & conditions </label>
                                <ErrorMessage name="acceptbox" component="p" style={{color:'red'}} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form>
                        <div className="row"><Link to="/login" className="link-form">Already Account Login Here</Link></div>
                    </div>
                </div>
                )}
            </Formik>
        );
}
