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
                        <p className="sans-serif subpara">
                            <Link to={`/profile/${user._id}`}>{user.username}</Link>
                        </p>
                        <p className="sans-serif grey regular">
                            {user.status}
                        </p>
                        <p className="sans-serif sm">
                            {user.biography}
                        </p>
                    </article>
                ))
            }
        </div>
    )
}

export default UserList;