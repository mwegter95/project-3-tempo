import React from "react";

const ReviewList = ({ reviews }) => {
    if(!reviews.length) {
        return <p className="serif sm gold">You haven't posted any reviews yet.</p>
    }

    return (
        <div>
            {reviews.length && 
                reviews.map(review => (
                    <article key={review._id}>
                        <p className="sans-serif para">
                            {review.review_text}
                        </p>
                        <p className="sans-serif para">
                            {review.rating}
                        </p>
                    </article>
                ))
            }
        </div>
    )
}

export default ReviewList