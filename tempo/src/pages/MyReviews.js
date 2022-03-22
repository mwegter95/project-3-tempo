import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MY_REVIEWS } from "../utils/queries";
import ReviewList from "../components/ReviewList";
import { Link } from "react-router-dom";

const MyReviews = () => {
    // create state for reviews
    const [ myReviews, setMyReviews ] = useState(null)
    const getMyReviews = (data) => {
        return data?.myReviews;
    };

    // query for reviews created by user
    const { loading } = useQuery(QUERY_MY_REVIEWS, {
        onCompleted: (data) => setMyReviews(getMyReviews(data))
    });

    let reviews = myReviews || [];

    if(loading) {
        return <section className="main-background">
            <div className="main-gold">
                <h1 className="serif-bold sm loading">Loading...</h1>
            </div>
        </section>
    }

    return (
        <div className="main-background myreviews">
            <div className="main-gold"> 
                <div className="back-to-dash">
                    <h1 className="sans-serif para white">Your Reviews.</h1>
                    <Link to="/dashboard"><button className="sans-serif regular">Back to dashboard</button></Link>
                </div>
                <ReviewList reviews={reviews} />
            </div>
        </div>
    )
}

export default MyReviews;