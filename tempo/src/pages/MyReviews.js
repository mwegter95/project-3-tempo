import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MY_REVIEWS } from "../utils/queries";
import ReviewList from "../components/ReviewList";

const MyReviews = () => {
    //const { data: userData } = useQuery(QUERY_ME);
    //console.log("this is after QUERY_ME", userData);
    const { loading, data } = useQuery(QUERY_MY_REVIEWS, {
        variables: { myId: "62328fda67a576964d780bf1" }
    });
   // console.log("this is after QUERY_MY_REVIEWS", userData);
   console.log(data);

   //expand on this
    const reviews = data?.reviews || [];
    console.log("this is reviews", reviews);

    if(loading) {
        return <div>loading...</div>
    };

    return (
        <div>
            <ReviewList reviews={reviews} />
        </div>
    )
}

export default MyReviews;