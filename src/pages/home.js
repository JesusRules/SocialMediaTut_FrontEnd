import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import axios from 'axios'
import { render } from '@testing-library/react';

import Scream from '../components/Scream';

// const home = () => {
class home extends Component {
    state = {
        screams: null
    }
    componentDidMount() 
    {
        axios.get('https://us-central1-socialape-14d54.cloudfunctions.net/api/screams')
        .then(res => {
            console.log(res.data);
            this.setState({
                screams: res.data,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream scream={scream}/>)
        ) : <p>Loading...</p>
    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile...</p>
            </Grid>
        </Grid>
    );
    }
}

export default home
