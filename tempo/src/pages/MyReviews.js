import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MY_REVIEWS } from "../utils/queries";
import ReviewList from "../components/ReviewList";

const MyReviews = () => {
    const { loading, data } = useQuery(QUERY_MY_REVIEWS);

    console.log("my review data", data);
    let reviews = data?.reviews || [];

    if(loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <ReviewList reviews={reviews} />
        </div>
    )
}

export default MyReviews;