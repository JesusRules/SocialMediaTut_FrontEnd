import React, { Component } from 'react';
import PropTypes from 'prop-types';
//withStyles
// MUI Stuff
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions.js';

const styles = {
    // ...theme,
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
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
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
    };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
            <TextField
                variant="standard"
                name="body"
                type="text"
                label="Comment on scream"
                error={errors.comment ? true : false}
                helperText={errors.comment}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
                style={styles.textField}
                 />
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
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment} )(CommentForm);
