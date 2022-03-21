import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FEED_MUSIC } from "../utils/queries";
import DiscoFeed from "../components/discoveryFeed";


//DONE: Add Meta value entry
//DONE: integrate discoMedia
//TODO: Add feedMusic to query
//TODO: Call feedMusic
//TODO: Add metaList UI
//MW: build discoMedia component



//render page
const Discover = () => {
    console.log('Discover start')
    //Define State to include a list of metadata values that will drive the discovery media feed
    const [metaCriteria, setMetaCriteria] = useState([{
            value: "drums",
            type: "genre"
        }]);

    const [feedPosition, setFeedPosition] = useState(0);

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
        userLink: "6235f05aeaf94cb37b1e1edf",
        description: "This track is included on The Bootleg Series Vol.1"
    })

    console.log('State Defined')
    console.log(activeMusic);
    console.log(metaCriteria);

    // const tempMeta = [{
    //     value: "country",
    //     type: "genre"
    // }]

    const { loading, data } = useQuery(FEED_MUSIC, {
        variables: { metaData: metaCriteria }
    });
        console.log('musicFeed queried');
    console.log(data);

    const handleAddMeta = async (event) => {
        event.preventDefault();  
         
        const newValue = {
                value: document.getElementById("addMeta").value,
                type: 'criteria'
        }

        const newValueList = [...metaCriteria, newValue];  

        setFeedPosition(0);
        setMetaCriteria(newValueList);       
    };

    const handleNextMusic = async (event) => {
        console.log("handleNextMusic");
        console.log(feedPosition);
        const nextPosition = feedPosition + 1;
        console.log(nextPosition);
        setFeedPosition(nextPosition);
        
    }

    useEffect(() => {
        console.log('useEffect');
        console.log(loading);
        console.log(data);
                
        if(!loading) {
            console.log(data.feedMusic);
            console.log(feedPosition);        
            setActiveMusic(data.feedMusic[feedPosition]);
        }
    }, [data, feedPosition])
    
    if (loading) {
        return <h3>Loading</h3>
    }    

    return (
      <section className="main-background">
        <div className="main-gold">
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
                <button onClick={handleNextMusic} className="sans-serif sm">Next</button>

            </div>
          </div>
        </section>
    )
}

export default Discover;