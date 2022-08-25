import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom'; 
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@mui/material/Grid';
import StaticProfile from '../components/profile/StaticProfile.js';
import {connect} from 'react-redux';
import { getUserData } from '../redux/actions/dataActions.js';
import Typography from '@mui/material/Typography';
import { matchPath } from 'react-router'
import ScreamSkeleton from '../util/ScreamSkeleton.js'
import ProfileSkeleton from '../util/ProfileSkeleton.js'
import Profile from '../components/profile/Profile.js'
import StaticProfileOurs from '../components/profile/StaticProfileOurs.js'

const styles = {
    header: {
        textAlign: 'center',
        fontSize: 32,
        paddingBottom: '1rem',
    }
}

class user extends Component {
    
    state = {
        profile: null,
        screamIdParam: null,
        hideNav: false,
        handle: '',
    };
    componentDidMount() {

        const handle = (window.location.pathname).split('/')[2];
        const screamId = (window.location.pathname ).split('/')[4];

        if(screamId) this.setState({ screamIdParam: screamId });

        this.props.getUserData(handle);
        axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/user/${handle}`)
        .then(res => {
            this.setState({
                handle: res.data.user.handle,
                profile: res.data.user //profile is static - doesnt needd to be in state
            })
        })
        .catch(err => console.log(err));

        
        //Flip stuff
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    //Flip stuff
    resize() {
        let currentHideNav = (window.innerWidth >= 600);
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
        }
    }
    
    //Flip stuff
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    const { authenticated } = this.props;

    const profileThing1 = this.state.profile === null ? (
        <ProfileSkeleton/>
        ) : authenticated ? (
            <StaticProfileOurs profile={this.state.profile}/>
            // <Profile/>
            ) : (
                <StaticProfile profile={this.state.profile}/>
        )
    

    // const profileThing2 = authenticated ? (
    // ) : (
    //     <StaticProfile profile={this.state.profile}/>
    // )

    const screamsMarkup = loading ? (
        <ScreamSkeleton/>
    ) : screams === null ? (
        <p>No barks from this user</p>
    ) : !screamIdParam ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
        screams.map(scream => {
            if(scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream}/>
            else return <Scream key={scream.screamId} scream={scream} openDialog/> //openDialog = true
        })
    )

    const GridOrder = this.state.hideNav ? (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <ProfileSkeleton/>
                ) : (
                <StaticProfile profile={this.state.profile}/>
                )} 
            </Grid>
        </Grid>
        ) : (
            <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <ProfileSkeleton/>
                ) : (
                <StaticProfile profile={this.state.profile}/>
                )} 
            </Grid>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
        </Grid>
      )

      const title = !loading ? (
        <Typography style={styles.header}>{this.state.handle}'s BARKS!</Typography>
      ) : (
        <Typography style={styles.header}> </Typography>
      )

    return (
        <>
        {title}
        <Fragment>
        <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
                 {/* SHOW */}
                {profileThing1}
            </Grid>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
        </Grid>
        </Fragment>
        </>
    )
  }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data,
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { getUserData })(user);
