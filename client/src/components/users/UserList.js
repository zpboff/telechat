import React, { Component } from "react";

class UserList extends Component {
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

export default UserList;
