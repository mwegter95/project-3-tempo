import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

    return (
        <div>
            <Link className="serif sm" to="/dashboard/myreviews">View your reviews</Link>
        </div>
    )
}

export default Dashboard;