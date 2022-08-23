import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
// import withStyles
import theme from './theme';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover',
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: theme.palette.primary.main, //#00bcd4'
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.075)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.25)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.25)',
        marginBottom: 10
    }
}

const ScreamSkeleton = (props) => {
    const { classes } = props;

    const content = (
        <Card style={styles.card}>
            <CardMedia style={styles.cover} image={NoImg}/>
            <CardContent style={styles.CardContent}>
                <div style={styles.handle}/>
                <div style={styles.date}/>
                <div style={styles.fullLine}/>
                <div style={styles.fullLine}/>
                <div style={styles.halfLine}/>
            </CardContent>
        </Card>
    )

    return <Fragment>{content}{content}{content}{content}{content}</Fragment>;
}

ScreamSkeleton.propTypes ={
    // classes: PropTypes.object.isRequired

}

export default ScreamSkeleton;
