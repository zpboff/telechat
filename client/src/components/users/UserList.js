import React, { Component } from "react";
import withAuth from "../shared/withAuth";
import { connect } from "react-redux";
import { getTopUsers } from "../../actions/users";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.props.getTopUsers();
    }

    render() {
        const { users } = this.props;
        return (
            <div>
                <ul>
                    {users &&
                        users.map((x, i) => (
                            <li key={`user-${i}`}>
                                {x.firstName} {x.lastName}
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        users: state.users.topUsers
    };
};

export default connect(
    mapStateToProps,
    { getTopUsers }
)(withAuth(UserList));
