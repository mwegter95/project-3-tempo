import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FEED_MUSIC, QUERY_USER } from "../utils/queries";
import DiscoFeed from "../components/discoveryFeed";


//render page
const Discover = () => {
    console.log('Discover start')
    //Define State to include a list of metadata values that will drive the discovery media feed
    const [metaCriteria, setMetaCriteria] = useState([]);

    const [feedPosition, setFeedPosition] = useState(0);

    const [activeMusic, setActiveMusic] = useState({})

    const [activeUser, setActiveUser] = useState();

    console.log('State Defined')
    console.log(activeMusic);
    console.log(metaCriteria);

    const { loading: musicLoading, data : musicData } = useQuery(FEED_MUSIC, {
        variables: { metaData: metaCriteria }
    });

    const { loading: userLoading, data : userData } = useQuery(QUERY_USER, {
        variables: { _id : activeUser }
    });

    console.log(' musicData queried');
    console.log( musicData);

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

    const handleRemoveMeta = async (value) => {
        console.log('handleRemoveMeta running');
        console.log(value);
        console.log(metaCriteria)
        const newValueList = metaCriteria.filter(meta => meta.value !== value);
        console.log(newValueList);
        setMetaCriteria(newValueList);

    }

    const handleMessage = async (event) => {
        console.log('userData')
        console.log(userData)
        document.location.href = `mailto:${userData.user.email}`
    }

    //Update the music record viewed in the DiscoFeed component
    useEffect(() => {
        console.log('useEffect');
        console.log(musicLoading);
        console.log( musicData);
                
        if(!musicLoading) {
            console.log( musicData.feedMusic);
            console.log(feedPosition);        
            setActiveMusic( musicData.feedMusic[feedPosition]);

        }
    }, [ musicData, feedPosition])

    useEffect(() => {
                        
        if(activeMusic) {
            setActiveUser(activeMusic.userLink);
        }
    }, [ activeMusic ])

    
    if (musicLoading) {
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
                <ul>
                    {metaCriteria.map((meta) => <h4>{meta.value} <button onClick={()=> handleRemoveMeta(meta.value)} className="sans-serif sm">-</button></h4>)}
                </ul>
            </div>
            {activeMusic?.userLink ? 
            <div>                                
                <div className="col-12 col-lg-3 mb-3">
                    <DiscoFeed
                        activeMusic={activeMusic}                        
                    />
                </div>
                <div>
                    <div>
                        <button onClick={handleMessage} className="sans-serif sm">Message</button>
                    </div>
                    <div>
                        <button onClick={handleNextMusic} className="sans-serif sm">Next</button>
                    </div>
                </div>
            </div>  : <div><h3>No results returned based on search criteria</h3></div>}
          </div>
        </section>
    )
}

export default Discover;