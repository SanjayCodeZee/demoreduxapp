import React, { useState } from "react";
import './../style.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckoutForm = () => {

    const navigate = useNavigate();
    const initialValues = {
        firstName : "",
        lastName : "",
        emailAddress: "",
        phoneNumber:"",
        state:"",
        city:"",
        zipcode:"",
        saveInfo:"false",
        sameAddress:"false",
        paymentMethod: "paypal",
        cardHolderName:"",
        cardNumber:"",
        cardExpiry:"",
        cardCvv:"",

    }

    const handleSubmit = (values) => {
        console.log(values);
    }

    const validationSchema = Yup.object().shape({
        firstName : Yup.string().required("First name is required").min(3,"Too Short Add More").max(30,"Too Long!"),
        lastName : Yup.string().required("Last name is required").min(3,"Too Short Add More").max(30,"Too Long!"),
        emailAddress : Yup.string().required("Email Address is required").email("Invalid Email"),
        phoneNumber : Yup.number().required("Phone Number is required")
        .min(1000000000,"Invalid Number")
        .max(9999999999,"No More Than 10 Invalid Number"),
        state : Yup.string().required("State is required"),
        city : Yup.string().required("City is required"),
        zipcode : Yup.string().required("Zipcode is required"),
        cardHolderName : Yup.string().required("cardHolderName is required"),
        cardNumber: Yup.number()
        .min(16, "Must be more than 16 digit")
        .required("This field is requried"),
        cardCvv: Yup.number()
        .min(3, "Only 3 digit")
        .required("This field is requried")

    })
    
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const handlePatmentMethod = (event) =>{
        setPaymentMethod(event.target.value);
    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {({values, errors, handleSubmit, handleChange, touched})=>(
                <section className="wrappper">    
                    <div className="container">
                    <div className="col-md-9 offset-md-1">
                    {/* {console.log(formik)} */}
                        <Form className="checkoutform">
                            <div className="row mb-3">
                                <div className="form-section-label"><h5>Billing Address</h5></div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="firstName">First name</label>
                                        <Field type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        className={
                                            'form-control' +
                                            (errors.firstName && touched.firstName ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="lastName">Last name</label>
                                        <Field type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        className={
                                            'form-control' +
                                            (errors.lastName && touched.lastName ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="emailAddress">Email Address</label>
                                        <Field type="text"
                                        name="emailAddress"
                                        placeholder="Email Address"
                                        className={
                                            'form-control' +
                                            (errors.emailAddress && touched.emailAddress ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="emailAddress" component="div" className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                        <Field type="number"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        className={
                                            'form-control' +
                                            (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="state">State</label>
                                        <Field as="select"
                                        name="state"
                                        className={
                                            'form-control' +
                                            (errors.state && touched.state ? ' is-invalid' : '')
                                        }>
                                        <option value="">Please Select</option>
                                        <option value="guj">Gujarat</option>
                                        <option value="mh">Maharashtra</option>
                                        </Field>
                                        <ErrorMessage name="state" component="div" className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="city">City</label>
                                        <Field type="text"
                                        name="city"
                                        placeholder="City"
                                        className={
                                            'form-control' +
                                            (errors.city && touched.city ? ' is-invalid' : '')
                                        }/>
                                        <ErrorMessage name="city" component="div" className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="zipcode">Zipcode</label>
                                        <Field type="text"
                                        name="zipcode"
                                        placeholder="Zipcode"
                                        className={
                                            'form-control' +
                                            (errors.zipcode && touched.zipcode ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="zipcode" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="form-section-label"><h5>Address</h5></div>
                                    <label className="form-label" htmlFor="sameAddress">
                                    <Field 
                                    type="checkbox"
                                    name="sameAddress"
                                    value="yes"
                                    />Shipping address is the same as my billing address</label>
                                
                                    <label className="form-label" htmlFor="saveInfo">
                                    <Field 
                                    type="checkbox"
                                    name="saveInfo"
                                    value="yes"
                                    />Save this information for next time</label>
                                <ErrorMessage name="state" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="row mb-3">
                                <div className="form-section-label mb-1"><h5>Payment Mode</h5></div>
                                <div className="btn-radio">
                                    <label className="form-label">
                                        <Field 
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === "paypal"}
                                        onChange={handlePatmentMethod}
                                        />Paypal</label>
                                    
                                    <label className="form-label">
                                        <Field 
                                        type="radio"
                                        name="paymentMethod"
                                        value="creditcard"
                                        checked={paymentMethod === "creditcard"}
                                        onChange={handlePatmentMethod}
                                        />Credit Card</label>
                                </div>
                                <ErrorMessage name="paymentMethod" component="div" className="invalid-feedback"/>                        
                            </div>
                            <div className="row mb-3">
                                {paymentMethod === "paypal"?<>
                                <div className="row">
                                    <div className="form-group">
                                        <label className="mb-2" htmlFor="cardHolderName">Cardholder's Name</label>
                                        <Field type="text"
                                        name="cardHolderName"
                                        placeholder="Cardholder's Name"
                                        className={
                                            'form-control' +
                                            (errors.cardHolderName && touched.cardHolderName ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="cardHolderName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label className="mb-2" htmlFor="cardNumber">Card Number</label>
                                        <input type="number"
                                        name="cardNumber" 
                                        value={values.cardNumber}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        placeholder="Enter Card number"
                                        className={
                                            'form-control' +
                                            (errors.cardNumber && touched.cardNumber ? ' is-invalid' : '')
                                        }/>
                                        <ErrorMessage name="cardNumber" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label className="mb-2" htmlFor="cardExpiry">Expiry</label>
                                        <input type="month"
                                        name="cardExpiry" 
                                        placeholder="MM/YYYY"
                                        value={values.cardExpiry}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className={
                                            'form-control' +
                                            (errors.cardExpiry && touched.cardExpiry ? ' is-invalid' : '')
                                        } />
                                        <ErrorMessage name="cardExpiry" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label className="mb-2" htmlFor="cardCvv">CVV</label>
                                        <input type="number"
                                        name="cardCvv" 
                                        value={values.cardCvv}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className={
                                            'form-control' +
                                            (errors.cardCvv && touched.cardCvv ? ' is-invalid' : '')
                                        }
                                        />
                                        <ErrorMessage name="cardCvv" component="div" className="invalid-feedback" />
                                    </div>
                                </div></>:''}
                                {paymentMethod === "creditcard"?<div className="form-section-label"><h5>creditCard</h5></div>:''}
                            </div>
                            <button type="submit" className="btn btn-primary">Place order</button>
                        </Form>
                        </div>
                    </div>
                </section>
                )
            }
        </Formik>
    )
}

export default CheckoutForm;