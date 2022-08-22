import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton.js'
// import withStyles from 'asd'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
// MUI Stuff
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Icons
import CloseIcon from '@mui/icons-material/Close';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions.js'
import Scream from './Scream.js';

const styles = {
    //THEME!!!
    // palette: {
    //     primary: {
    //     light: '#33c9dc',
    //     main: '#00bcd4',
    //     dark: '#008394',
    //     contrastText: '#fff'
    //     },
    //     secondary: {
    //     light: "#ff6333",
    //     main: '#ff3d00',
    //     dark: '#b22a00',
    //     contrastText: '#fff'
    //     },
    // },
    // typography: {
    //     useNextVariants: true
    // },
    // form: {
    //     textAlign: 'center',
    // },
    // image: {
    //     margin: '20px auto 20px auto',
    // },
    // pageTitle: {
    //     margin: '10px auto 10px auto'
    // },
    // textField: {
    //     margin: '10px auto 10px auto'
    // },
    // button: {
    //     marginTop: 20,
    //     position: 'relative'
    // },
    // customError: {
    //     color: 'red',
    //     fontSize: '0.8rem',
    //     marginTop: 10
    // },
    // progress: {
    //     position: 'absolute'
    // },
    //NEW
    invisibleSeparator: {
        border: 'none',
        margin: 4,
    },
    profileImage: {
        // maxWidth: 200,
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
}

class ScreamDialog extends Component{
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
    const { classes, scream: { screamId, body, createdAt, likeCount, 
        commentCount, userImage, userHandle }, UI: { loading }} = this.props;

    const dialogMarkup = loading ? (
            <CircularProgress size={200}/>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" style={styles.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr style={styles.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr style={styles.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
            </Grid>
        </Grid>
    )
    return (
        <Fragment>

            <MyButton onClick={this.handleOpen} tip="Expand scream" style={styles.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
            <MyButton
                tip="Close"
                onClick={this.handleClose}
                style={styles.closeButton}
            >
            <CloseIcon />
            </MyButton>
            <DialogContent style={styles.dialogContent}>
                {dialogMarkup}
            </DialogContent>
            </Dialog>

        </Fragment>
    )
   }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI,
})

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);