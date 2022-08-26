import React, { Component } from 'react';
import PropTypes from 'prop-types';
//withStyles
// MUI Stuff
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
// Redux stuff
import { connect } from 'react-redux';
import { likeScream, submitComment, submitComment2, getScream } from '../../redux/actions/dataActions.js';
import store from '../../redux/store.js';
import DialogActions from '@mui/material/DialogActions';
import {styled} from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import {useState} from 'react';
import {RetrieveCommentCount} from './Scream.js'

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        HUGE: 3200,
      }
    }
  })

const styles = {
    // ...theme,
    textField: {
        // margin: '10px auto 10px auto',
        // textAlign: 'center',
        // width: '80vw'
        //660px LOCK it
    },
    button: {
        marginTop: 12,
        position: 'relative',
        cursor: 'pointer'
    },
    visibleSeparator: {
        width: '100%',
        // borderBottom: '1px solid rgba(0,0,0,0.1)',
        border: 'none',
        marginBottom: 30
    }
}

const TextFieldStyle = styled(TextField)({
    margin: '10px auto 10px auto',
    textAlign: 'center',
    width: '78vw',
    
    [theme.breakpoints.down('370')]: {
        width: 240,
    },
    [theme.breakpoints.down('325')]: {
        width: 210,
    },
    [theme.breakpoints.up('660')]: {
        width: 550,
    },
});  

const TextFieldMissingStyle = styled('div')({
    margin: '10px auto 10px auto',
    textAlign: 'center',
    width: '78vw',
    
    [theme.breakpoints.down('370')]: {
        width: 240,
    },
    [theme.breakpoints.down('325')]: {
        width: 210,
    },
    [theme.breakpoints.up('660')]: {
        width: 550,
    },
});  


export class CommentForm extends Component {
    state = {
        body: '',
        errors: {},
        commentCount: 0,
    };
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' });
        }
        // if (nextProps.data) {
            //     store.dispatch({type: 'SUBMIT_COMMENT'});
            // }
        }
        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
        handleSubmit = (event) => {
            event.preventDefault();
            // this.props.submitComment(this.props.screamId, { body: this.state.body });
            this.props.submitComment2(this.props.screamId, { body: this.state.body });
            // this.setState({commentCount: 32});
            // this.props.likeScream(this.props.screamId);

            // this.props.updateCount(this.props.screamId);
            
            //THIS TECHNIQUE DOESNT WORK
        //     setTimeout(() => {
        //         axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${this.props.screamId}`)
        //         .then(res => {
        //             RetrieveCommentCount(res.data.commentCount);
        //     })
        //     .catch(err => console.log(err));
        // }, 320); 
        
    };
    
    render() {
        const {authenticated } = this.props;
        const errors = this.state.errors;
        
        const commentFormMarkup = authenticated ? (
            // <Grid item sm={12} style={{ textAlign: 'center'}}>
            <Grid item xs={12} style={{ textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
            <TextFieldStyle
                // variant="standard"
                inputProps={{ maxLength: 320 }}
                fullWidth
                name="body"
                type="text"
                label="Comment on bark"
                error={errors.comment ? true : false}
                helperText={errors.comment}
                value={this.state.body}
                onChange={this.handleChange}
                // fullWidth
                multiline
                rows="4"
                style={styles.textField}
                 />
                 <br/>
                    <Button type="submit"
                    variant="contained"
                    color="primary"
                    style={styles.button}>
                        Submit
                    </Button>
            </form>
            <hr style={styles.visibleSeparator} />
        </Grid>
        //ELSE do div
    ) : <TextFieldMissingStyle></TextFieldMissingStyle>

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
    // submitComment: PropTypes.func.isRequired,
    submitComment2: PropTypes.func.isRequired,


    likeScream: PropTypes.func.isRequired, //??


    // updateCount: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    authenticated: state.user.authenticated,
})

const mapActionsToProps = {
    submitComment2,
    getScream,
    likeScream,
    // updateCount
}

export default connect(mapStateToProps, mapActionsToProps )(CommentForm);
