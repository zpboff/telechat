import React from 'react'
import { IconButton, Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default (props) => (
    <>
        <IconButton aria-label="Show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
        </IconButton>
        <IconButton
            edge="end"
            aria-label="Account of current user"
            aria-controls='profile'
            aria-haspopup="true"
            onClick={console.log}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    </>
)