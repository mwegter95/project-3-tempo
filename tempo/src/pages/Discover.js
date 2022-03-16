import React from "react";
import { useQuery } from "@apollo/client"
import { QUERY_USERS } from "../utils/queries";
import UserList from "../components/UserList";

const Discover = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    if(loading) {
        return <div>loading...</div>
    };

    return (
        <div>
            <h1 className="sans-serif para">Discover Page</h1>
            <div>
                <UserList users={users} />
            </div>
        </div>
    )
}

export default Discover;