import React from "react";

const ReviewList = ({ reviews }) => {
    console.log(reviews);
    if(!reviews.length) {
        return <p className="serif sm gold">You haven't posted any reviews yet.</p>
    }

    return (
        <div>
            {reviews.length && 
                reviews.map(review => (
                    <article key={review._id}>
                        <a href={`/profile/${review.reviewOf._id}`} className="sans-serif subpara">Review of: {review.reviewOf.username}</a>
                        <p className="sans-serif sm">
                            {review.review_text}
                            {review.rating} / 10
                        </p>
                        <p className="sans-serif sm gold">
                            {review.created_at}
                        </p>
                    </article>
                ))
            }
        </div>
    )
}

export default ReviewList