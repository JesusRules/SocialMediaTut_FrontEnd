import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import MyButton from '../util/MyButton.js'
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
//MUI stuff
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
//Redux stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions.js';

const styles = {

    textField: {
        margin: '10px auto 10px auto'
    },
    submitButton: {
        position: 'relative',
        top: '0.1rem'
    },
    progressSpinner: {
        position: 'absolute',
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
        // left: '90.7%',
        // top: '13%'
    }
}

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' });
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({body: this.state.body}); //goes to get posted in database, saves, and get authenticated user
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                        <MyButton tip="Close" onClick={this.handleClose} style={styles.closeButton}>
                            <CloseIcon/>
                        </MyButton>
                        <DialogTitle>Post a new scream</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField name="body" type="text" label="SCREAM!!" 
                                                multiline rows="3" placeholder='Scream at your fellow apes' 
                                                error={errors.body ? true : false} helperText={errors.body}
                                                style={styles.textField} onChange={this.handleChange} fullWidth />
                                <Button type="submit" variant="contained" color="primary"
                                    style={styles.submitButton} disabled={loading}>
                                        Submit
                                        {loading && 
                                        (<CircularProgress size={30} style={styles.progressSpinner} />)}
                            </Button>
                            </form>
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream } )(PostScream)