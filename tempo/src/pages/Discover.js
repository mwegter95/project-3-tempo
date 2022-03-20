import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { MUSIC_FEED } from "../utils/queries";
// import DiscoFeed from "../components/discoveryFeed";
// import MetaList from "../components/metaList";

//DONE: Add Meta value entry
//TODO: Add metaList component
//TODO: Add feedMusic to query
//TODO: Call feedMusic
//TODO: build discoMedia component
//TODO: integrate discoMedia


//render page
const Discover = () => {

    //Define State to include a list of metadata values that will drive the discovery media feed
    const [metaCriteria, setMetaCriteria] = useState([]);
    
    const handleAddMeta = async (event) => {
        event.preventDefault();
              
        const newMeta = document.getElementById("addMeta").value;

        setMetaCriteria([...metaCriteria, newMeta]);
    };
        
    return (
        <div className="main">
            <h1 className="sans-serif para">Discover Page</h1>
            <div>
                <form onSubmit={handleAddMeta} autoComplete="off">
                    <div>
                        <h1 className="sans-serif white para">What would you like to find?</h1>
                                                
                        <label htmlFor="addMeta" className="sans-serif white subpara">Search For:</label>
                        <input id="addMeta" name="addMeta" className="sans-serif sm" />
                        
                        
                        <button className="sans-serif sm">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Discover;