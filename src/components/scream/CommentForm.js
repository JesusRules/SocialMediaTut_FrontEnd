import React, { Component } from 'react';
import PropTypes from 'prop-types';
//withStyles
// MUI Stuff
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
// Redux stuff
import { connect } from 'react-redux';
import { submitComment, submitComment2, getScream, updateCount } from '../../redux/actions/dataActions.js';
import store from '../../redux/store.js';
import DialogActions from '@mui/material/DialogActions';

const styles = {
    // ...theme,
    textField: {
        margin: '10px auto 10px auto',
        textAlign: 'center',
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

export class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
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
        // this.props.updateCount(this.props.screamId);
    };

  render() {
    const {authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
        // <Grid item sm={12} style={{ textAlign: 'center'}}>
        <Grid item xs={12} style={{ textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
            <TextField
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
                rows="3"
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
    ) : null

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
    // submitComment: PropTypes.func.isRequired,
    submitComment2: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
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
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    submitComment2,
    getScream,
    updateCount
}

export default connect(mapStateToProps, mapActionsToProps )(CommentForm);
