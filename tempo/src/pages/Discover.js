import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FEED_MUSIC, MUSIC_FEED } from "../utils/queries";
import DiscoFeed from "../components/discoveryFeed";


//DONE: Add Meta value entry
//DONE: integrate discoMedia
//TODO: Add feedMusic to query
//TODO: Call feedMusic
//TODO: Add metaList UI
//MW: build discoMedia component



//render page
const Discover = () => {

    //Define State to include a list of metadata values that will drive the discovery media feed
    const [metaCriteria, setMetaCriteria] = useState([]);

    const [activeMusic, setActiveMusic] = useState({
        _id: "1234",
        title: "Whiskey Barrel Guitar • JUSTIN JOHNSON SOLO SLIDE GUITAR",
        media: "https://www.youtube.com/watch?v=fXGErRbyv6M&t=3s",
        meta: [{
            value: "guitar",
            type: "instrument"    
            },{
                value: "blues",
                type: "genre"        
        }],
        userLink: "1234",
        description: "This track is included on The Bootleg Series Vol.1"
    })

    const tempMeta = [{
        value: "bass",
        type: "instrument"
    }]

    const { musicFeed } = useQuery(FEED_MUSIC, {
        variables: { metaData: tempMeta }
    });
    
    
    const handleAddMeta = async (event) => {
        event.preventDefault();
         
        // console.log(metaCriteria);

        const newValue = document.getElementById("addMeta").value;

        // const newValueList = [...metaCriteria, newValue];

        // const metaCriteria = [];

        // newValueList.forEach(element => {
        //     metaCriteria.push({
        //         value: element.value,
        //         type: 'criteria'
        //     })
        // });

        console.log(newValue);
        console.log(musicFeed);
        // console.log(newValueList);
        // console.log(metaCriteria);

        // setMetaCriteria(newValueList);
    
        setActiveMusic(musicFeed[0]);

        console.log("after running");
        
        console.log(activeMusic);
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
                <div className="col-12 col-lg-3 mb-3">
                    <DiscoFeed
                        activeMusic={activeMusic}                        
                    />
                </div>
            </div>
        </div>
    )
}

export default Discover;