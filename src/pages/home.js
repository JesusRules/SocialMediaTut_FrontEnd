import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
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

// const home = () => {
class home extends Component {
    state = {
        screams: null
    }
    componentDidMount() 
    {
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;
        
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
            ) :  (
            // <Typography>asads</Typography>
            <ScreamSkeleton/>
        );

    return (
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
