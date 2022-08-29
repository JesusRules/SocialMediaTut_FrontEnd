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
        position: 'relative',
        // left: '90%',
        left: '0%',
        transform: 'translateY(-3px)',
        // display: 'inline',
        // contentAlign:
        // position: 'absolute',
        // right: '0%',
        // marginRight: '.9rem',
        // top: '3%'
    }
}

class DeleteComment extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteComment = () => {
        this.props.deleteScream(this.props.commentId);
        this.setState({ open: false });
    }

    render() {
    const { classess, commentId } = this.props;

    return (
    <Fragment>
        <MyButton tip="Delete Comment" onClick={this.handleOpen} style={styles.deleteButton}>
            <DeleteOutline color="secondary"/>
        </MyButton>

        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm">

        <DialogTitle>
            Are you sure you want to delete this comment ?
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.deleteComment} color="secondary">Delete</Button>
            </DialogActions>
        </DialogTitle>

        </Dialog>
    </Fragment>
    )
  }
}

DeleteComment.propTypes = {
    deleteScream: PropTypes.func.isRequired,

    // screamId: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
}

export default connect(null, { deleteScream })(DeleteComment)
