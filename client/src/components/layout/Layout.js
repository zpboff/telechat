import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { user } from '../../helpers/propTypesHelper'

@inject(stores => {
    return {
        user: stores.rootStore.user
    };
})
@observer
class Layout extends Component {
    render() {
        const { user } = this.props;
        const isAuthenticated = user.isAuthenticated;
        return <div>User is authenticated: {isAuthenticated.toString()}</div>;
    }
}

Layout.propTypes = {
    user: user
};

export default Layout;
