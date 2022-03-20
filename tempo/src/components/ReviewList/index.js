import React from "react";
import { animated, config, useTrail } from "react-spring";

const ReviewList = ({ reviews }) => {
    const trail = useTrail(reviews.length, {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        },
        config: config.slow
    });

    if(!reviews.length) {
        return <p className="serif subpara">You haven't posted any reviews yet.</p>
    };

    return (
        <div>
            {reviews.length && 
                trail.map((animation, index) => (
                    <animated.article key={index} style={animation} className="review-layout">
                        <div>
                            <p className="serif sm grey">Review for: <a className="sans-serif sm white" href={`/profile/${reviews[index].reviewOf._id}`}>{reviews[index].reviewOf.username}</a></p>
                            <p className="serif sm grey">Rating: <span className="sans-serif sm white">{reviews[index].rating}/10</span></p>
                        </div>
                        <p className="sans-serif subpara white">
                            {reviews[index].review_text}
                        </p>
                        <p className="serif sm grey createdAt">
                            Posted on {reviews[index].created_at}
                        </p>
                    </animated.article>
                ))
            }
        </div>
    )
}

export default ReviewList