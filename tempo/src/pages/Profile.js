import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";

const Profile = () => {
    const { id: userId } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { _id: userId }
    });

    const user = data?.user || {};

    const [addReview, { error }] = useMutation(ADD_REVIEW);
    const [ formState, setFormState ] = useState({
        reviewBy: "",
        reviewOf: userId,
        rating: "",
        review_text: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "rating") {
            let newValue = parseInt(value);

            setFormState({
                ...formState,
                [name]: newValue
            });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addReview({
                variables: { ...formState }
            });
            window.location.assign("/dashboard/myreviews");
        } catch(e) {
            console.log(e);
        }
    };

    if(loading) {
        return <div className="serif para main grey loading">loading...</div>
    };
    // checks if the id in parameters is valid
    if(!data) {
        return <div className="serif para">This user does not exist.</div>
    };

    return (
        <div className="main-background">
            <div className="main-gold profile">
                <h1 className="sans-serif white subtitle">{user.username}'s Profile</h1>
                
                <form onSubmit={handleFormSubmit} className="review-layout">
                    <h1 className="sans-serif white subpara">Write a review on {user.username}</h1>
                    <p className="serif grey sm">The reviews you write will only be seen by you.</p>
                
                    
                    <label htmlFor="rating" className="sans-serif white subpara">Rating:</label>
                    <div>
                        <input name="rating" type="number" className="sans-serif sm" onChange={handleChange} />
                        <p className="sans-serif white subpara">/10</p>
                    </div>
                
                    <label htmlFor="review_text" className="sans-serif white subpara">Review:</label>
                    <textarea name="review_text" type="review" className="sans-serif sm" maxLength="500" onChange={handleChange}></textarea>
                
                    <button type="submit" className="sans-serif sm">Submit Review</button>
                </form>
            </div>
        </div>
    )
    
};

export default Profile;