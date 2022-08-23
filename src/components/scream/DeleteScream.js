import React, { Component, Fragment } from 'react'
// import withStyles from '@mui/material';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton.js';

// MUI Stuff
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DeleteOutline from '@mui/icons-material/DeleteOutline'; //icon

import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions.js'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '13%'
    }
}

class DeleteScream extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    }

    render() {
    const { classess, screamId } = this.props;

    return (
    <Fragment>
        <MyButton tip="Delete Bark" onClick={this.handleOpen} style={styles.deleteButton}>
            <DeleteOutline color="secondary"/>
        </MyButton>

        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm">

        <DialogTitle>
            Are you sure you want to delete this bark ?
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.deleteScream} color="secondary">Delete</Button>
            </DialogActions>
        </DialogTitle>

        </Dialog>
    </Fragment>
    )
  }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    // classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
}

export default connect(null, { deleteScream })(DeleteScream)
