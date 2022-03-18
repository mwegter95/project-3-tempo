import React from "react";

const ReviewList = ({ reviews }) => {
    console.log(reviews);
    if(!reviews.length) {
        return <p className="serif subpara white">You haven't posted any reviews yet.</p>
    }

    return (
        <div>
            {reviews.length && 
                reviews.map(review => (
                    <article key={review._id} className="review-layout">
                        <div>
                            <p className="serif sm grey">Review for: <a className="sans-serif sm white" href={`/profile/${review.reviewOf._id}`}>{review.reviewOf.username}</a></p>
                            <p className="serif sm grey">Rating: <span className="sans-serif sm white">{review.rating}/10</span></p>
                        </div>
                        <p className="sans-serif subpara white">
                            {review.review_text}
                        </p>
                        <p className="serif sm grey createdAt">
                            Posted on {review.created_at}
                        </p>
                    </article>
                ))
            }
        </div>
    )
}

export default ReviewList