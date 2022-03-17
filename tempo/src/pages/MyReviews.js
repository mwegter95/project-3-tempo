import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MY_REVIEWS, QUERY_REVIEWS } from "../utils/queries";
import ReviewList from "../components/ReviewList";

const MyReviews = () => {
    const { data: allReviews } = useQuery(QUERY_REVIEWS); //
    console.log("all reviews", allReviews); //
    // create state for reviews
    const [ myReviews, setMyReviews ] = useState(null)
    const getMyReviews = (data) => {
        return data?.myReviews;
    };

    // query for reviews created by user
    const { loading, data, error } = useQuery(QUERY_MY_REVIEWS, {
        onCompleted: (data) => setMyReviews(getMyReviews(data))
    });

    let reviews = myReviews || [];

    if(loading) {
        return <div className="serif para">loading...</div>
    }

    return (
        <div>
            <h1 className="sans-serif para">Your reviews</h1>
            <ReviewList reviews={reviews} />
        </div>
    )
}

export default MyReviews;