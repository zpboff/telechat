import React from 'react'
import withAuth from '../shared/withAuth';

function Profile(){
    return(
        <div>Profile</div>
    )
}

export default withAuth(Profile)