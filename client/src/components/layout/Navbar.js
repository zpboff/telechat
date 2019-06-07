import AppBar from '@material-ui/core/AppBar'
import React, { Component } from 'react'
import UserLinks from './UserLinks'
import AuthLinks from './AuthLinks';
class Navbar extends Component {
    render() {
        return (
            <>
                <div>HI</div>
                <AuthLinks />
                <UserLinks />
            </>
        )
    }
}
export default Navbar