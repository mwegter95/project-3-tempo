import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import UserList from "../components/UserList";

const Discover = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    if(loading) {
        return <div className="main serif para grey loading">loading...</div>
    };

    return (
        <section className="main-background">
            <div className="main-gold">
                <h1 className="sans-serif para">Discover Page</h1>
                <div>
                    <UserList users={users} />
                </div>
            </div>
        </section>
    )
}

export default Discover;