import React, { Component, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream.js';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions.js'
import { Typography } from '@mui/material';
import ScreamSkeleton from '../util/ScreamSkeleton.js'
import {styled} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//LOGIN TOKEN STUFF
import { SET_AUTHENTICATED } from '../redux/types.js';
import { logoutUser, getUserData } from '../redux/actions/userActions.js'
import jwtDecode from 'jwt-decode'
import store, {persistor} from '../redux/store.js';

const RespHomePage = () => {
    const [w, setW] = useState(window.innerWidth);
  
    useEffect(()=> {
      const handleResize = () => {
        setW(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
      }, []);

    return (
     <div>
        <Typography>{w}</Typography>
     </div>   
    )
  }

const TokenCheck = () => {
  const token = localStorage.FBIdToken;
//   console.log(token);
  if (token){
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = '/login'
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token; //if we refresh!
      store.dispatch(getUserData());
    }
  } else {
    store.dispatch(logoutUser());
    // alert("You've been timed out, please sign in again")
    //   window.location.href = '/login'
  }
}


// const home = () => {
class home extends Component {
    
    state = {
        screams: null,
        hideNav: false,
    }
    // componentDidMount() 
    // {
    //     this.props.getScreams();
    // }

    componentDidMount() {
        this.props.getScreams();

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        window.addEventListener('focus', this.focus.bind(this));
        this.focus();
    }
    focus() {
        console.log("FOCUSED");
        TokenCheck();
    }
    
    resize() {
        let currentHideNav = (window.innerWidth >= 600);
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    render() {
        const { screams, loading, scream } = this.props.data;
       
        let recentScreamsMarkup
        if (screams) {
                recentScreamsMarkup = !loading ? (
                    screams.map(scream => <Scream key={scream.screamId} scream={scream}     screamm={scream}/>)
                    ) :  (
                    <ScreamSkeleton/>
                    
                )           
           }

    return (

        // <Grid container spacing={2}>
        //     <Grid item sm={8} xs={12}>
        //         {recentScreamsMarkup}
        //     </Grid>
        //     <Grid item sm={4} xs={12}>
        //         <Profile />
        //     </Grid>
        // </Grid>
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home)



//L

        // const GridOrder = this.state.hideNav ? (
        //     <Grid container spacing={2}>
        //         <Grid item sm={8} xs={12}>
        //             {recentScreamsMarkup}
        //         </Grid>
        //         <Grid item sm={4} xs={12}>
        //             <Profile />
        //         </Grid>
        //     </Grid>
        //     ) : (
        //         <Grid container spacing={2}>
        //         <Grid item sm={4} xs={12}>
        //             <Profile />
        //         </Grid>
        //         <Grid item sm={8} xs={12}>
        //             {recentScreamsMarkup}
        //         </Grid>
        //     </Grid>
        //   )