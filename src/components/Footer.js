import React from "react";
import './../style.css';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start bg-dark text-muted">
                <div className="container text-md-start mt-5">
                    <div className="row mt-3 d-flex justify-content-between ">
                        <div className="col-md-3 col-lg-4 col-xl-3">
                            <div className="mt-4">
                                <Link 
                                className="navbar-brand" to="/">CODE<span className='logotext'>ZEE</span></Link>
                            </div>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <h6 className="text-uppercase fw-bold mb-4 mt-4">Contact</h6>
                            <p><i className="fa fa-home me-3"></i> New York, NY 10012, US</p>
                            <p>
                                <i className="fa fa-envelope me-3"></i>
                                info@example.com
                            </p>
                            <p><i className="fa fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fa fa-print me-3"></i> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
