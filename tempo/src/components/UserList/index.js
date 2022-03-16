import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {

    if(!users.length) {
        return <p className="serif sm gold">No Users yet</p>
    }

    return (
        <div>
            {users.length && 
                users.map(user => (
                    <article key={user._id}>
                        <p className="sans-serif para">
                            <Link to={`/profile/${user._id}`}>{user.username}</Link>
                        </p>
                        <p className="sans-serif sm">
                            {user.bio}
                            {user.status}
                        </p>
                    </article>
                ))
            }
        </div>
    )
}

export default UserList;