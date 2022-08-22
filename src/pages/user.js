import React, { Component } from 'react'
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

const getHandleFromPathname = () => {
    // return pathname.replace(/^us\./,'');
  }
class user extends Component {
    
    state = {
        profile: null,
        screamIdParam: null
    };
    componentDidMount() {
        // const handle = this.props.match.params.handle;
        // const screamId = this.props.match.params.screamId;
        
        const handle = (window.location.pathname).split('/')[2];
        const screamId = (window.location.pathname ).split('/')[4];
        // const screamId = (window.location.pathname + '/scream/asdasdsd').split('/')[4];

        // console.log(handle);
        // console.log(screamId);

        if(screamId) this.setState({ screamIdParam: screamId });

        this.props.getUserData(handle);
        axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user //profile is static - doesnt needd to be in state
            })
        })
        .catch(err => console.log(err));
    }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
        <p>Loading data...</p>
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : !screamIdParam ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
        screams.map(scream => {
            if(scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream}/>
            else return <Scream key={scream.screamId} scream={scream} openDialog/> //openDialog = true
        })
    )

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <p>Loading profile...</p>
                ) : (
                <StaticProfile profile={this.state.profile}/>
                )} 
            </Grid>
        </Grid>
    )
  }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(user);
