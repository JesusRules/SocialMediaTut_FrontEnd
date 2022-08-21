import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'

//Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions.js';

//MUI stuff
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Icons
import EditIcon from '@mui/icons-material/Edit';

const styles = {
    // ...theme,
    palette: {
        primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        contrastText: '#fff'
        },
        secondary: {
        light: "#ff6333",
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#fff'
        },
    },
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto',
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        // marginTop: 20,
        // position: 'relative',
        float: 'right'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }
        this.props.editUserDetails(userDetails); //goes to get posted in database, saves, and get authenticated user
        this.handleClose();
    }
  render() {
    // const {classes} = this.props;
    return (
      <Fragment>

        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={this.handleOpen} style={styles.button}>
            <EditIcon color="primary"/>
          </IconButton>
        </Tooltip>

        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm">
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        name="bio"
                        type="text"
                        label="Bio"
                        multiline
                        rows="3"
                        placeholder='A short bio about yourself'
                        style={styles.textField}
                        value={this.state.bio}
                        onChange={this.handleChange}
                        fullWidth
                        // variant="standard"
                        />
                    <TextField
                        name="website"
                        type="text"
                        label="Website"
                        placeholder='Your personal/professional website'
                        style={styles.textField}
                        value={this.state.website}
                        onChange={this.handleChange}
                        fullWidth
                        variant="standard"
                        />
                    <TextField
                        name="location"
                        type="text"
                        label="Location"
                        placeholder='Where you live'
                        style={styles.textField}
                        value={this.state.location}
                        onChange={this.handleChange}
                        fullWidth
                        variant="standard"
                        />
                </form>
            </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                Save
            </Button>
        </DialogActions>
        </Dialog>

      </Fragment>
    )
  }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    // classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(EditDetails)
