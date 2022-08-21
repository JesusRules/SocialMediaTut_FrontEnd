import React, { Component } from 'react'
import Login from '../pages/login.js';
import { BrowserRouter as Router, Outlet, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const AuthRoute = () => {
const AuthRoute = ({authenticated}) => {
    return (
        // console.log("? :" + authenticated)
        authenticated ? <Navigate replace to="/" /> : <Outlet/>

        // <Outlet/>
        // <Route
        // {...rest}
        // render={(props) => authenticated === true ? <Navigate replace to="/" /> : <Component {...props}/>}
        // />
    )
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  })

  AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
  }

  export default connect(mapStateToProps)(AuthRoute);