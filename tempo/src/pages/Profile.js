import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";

const Profile = () => {
    const { id: userId } = useParams();
    const { data: userData } = useQuery(QUERY_ME);
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { _id: userId }
    });
    const user = data?.user || {};

    const [addReview, { error }] = useMutation(ADD_REVIEW);
    const [ formState, setFormState ] = useState({
        myId: "",
        userId: userId,
        rating: "",
        reviewText: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userData);

        setFormState({
            ...formState,
            myId: userData.me._id
        });

        try {
            const { data } = await addReview({
                variables: { ...formState }
            });
        } catch(e) {
            console.log(e);
        }
    } ;

    if(loading) {
        return <div className="serif para">loading...</div>
    };

    if(!data) {
        return <div className="serif para">This user does not exist.</div>
    };

    return (
        <div>
            <h1 className="sans-serif subtitle">{user.username}'s Profile</h1>
            <form onSubmit={handleFormSubmit}>
                <h1 className="sans-serif para">Write a review on {user.username}</h1>
                <p className="serif sm">The reviews you write will only be seen by you.</p>

                <label htmlFor="rating" className="sans-serif subpara">Rating:</label>
                <input name="rating" type="number" className="sans-serif sm" onChange={handleChange} />

                <label htmlFor="reviewText" className="sans-serif subpara">Review:</label>
                <textarea name="reviewText" type="review" className="sans-serif sm" maxLength="500" onChange={handleChange}></textarea>

                <button type="submit" className="sans-serif sm">Submit Review</button>
            </form>
        </div>
    )
    
};

export default Profile;