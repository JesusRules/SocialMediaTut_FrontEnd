import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@mui/material/Grid';
import {connect} from 'react-redux';
import { getUserData } from '../redux/actions/dataActions.js';

class user extends Component {
    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/user/${handle}`)
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    data: state.data
}

export default connect(mapStateToProps, { getUserData })(user);
