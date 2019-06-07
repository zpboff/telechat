import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { IconButton, Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'
import '../../styles/navbar.css'

const NavBar = () => {
    return (
        <div>
            <AppBar position="static" className='navbar'>
                <Toolbar>
                    <IconButton aria-label="Show 4 new mails" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Telechat
                    </Typography>
                    <IconButton aria-label="Show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="Account of current user"
                        //   aria-controls={menuId}
                        aria-haspopup="true"
                        //   onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default NavBar;