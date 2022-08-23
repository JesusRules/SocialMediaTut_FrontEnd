import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import dayjs from'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
// MUI Stuff
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
// Icons
import NotificationIcon from '@mui/icons-material/Notifications'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatIcon from '@mui/icons-material/Chat'
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
import axios from 'axios';
import store from '../../redux/store.js';
import Delayed from '../Delayed';

class Notifications extends Component {
    state = {
        anchorEl: null,
    };

    handleOpen = (event) => {
        this.onMenuOpened();
        this.setState({ anchorEl: event.target });
    };
    handleClose = () => {
        this.onMenuOpened();
        this.setState({ anchorEl: null, open: false });
    };
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(notif => !notif.read) //only get ones that are not read
            .map(notif => notif.notificationId); //returns an array of the ones read false
            this.props.markNotificationsRead(unreadNotificationsIds);
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.notifications) {
    //         this.onMenuOpened();
    //     }
    //     //     setTimeout(() => {
    //     //         this.onMenuOpened();
    //     //         store.dispatch( {type: 'MARK_NOTIFICATIONS_READ'})
    //     //       }, 1000);
    //     // }
    // }
    render() {
        
        
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0){
            
            notifications.filter(notification => notification.read === false).length > 0 //not been read
                ? notificationsIcon = (
                    <Badge badgeContent={notifications.filter(notification => notification.read === false).length}
                        color="secondary">
                            <NotificationIcon/>
                        </Badge>
                ) : (
                    notificationsIcon = <NotificationIcon/>
                )
        } else {
            notificationsIcon = <NotificationIcon/>
        }

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map(notif => {
                    const verb = notif.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(notif.createdAt).fromNow();
                    const iconColor = notif.read ? 'primary' : 'secondary';
                    const icon = notif.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10}}/>
                    )

                    return (
                        <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/user/${notif.recipient}/scream/${notif.screamId}`}
                                 >
                                    {notif.sender} {verb} your bark {time} 
                                </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )
        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                            {notificationsIcon}
                        </IconButton>
                </Tooltip>
                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                // onLoadStart={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {  markNotificationsRead })(Notifications);