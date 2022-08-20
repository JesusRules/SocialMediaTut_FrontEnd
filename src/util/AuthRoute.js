import React, { Component } from 'react'
import Login from '../pages/login.js';
import { BrowserRouter as Router, Outlet, Routes, Navigate } from 'react-router-dom';

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
  }
  
  export default AuthRoute