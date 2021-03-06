import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useSpring, animated, config } from "react-spring";

import { useQuery } from "@apollo/client";
import { FEED_MUSIC, QUERY_USER } from "../utils/queries";
import DiscoFeed from "../components/discoveryFeed";

//render page
const Discover = () => {
    //Define State to include a list of metadata values that will drive the discovery media feed
    const [metaCriteria, setMetaCriteria] = useState([]);
    const [feedPosition, setFeedPosition] = useState(0);
    const [activeMusic, setActiveMusic] = useState({})

    const [activeUser, setActiveUser] = useState();

    const { loading: musicLoading, data : musicData } = useQuery(FEED_MUSIC, {
        variables: { metaData: metaCriteria }
    });

    const { loading: userLoading, data : userData } = useQuery(QUERY_USER, {
        variables: { _id : activeUser }
    });

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
        const nextPosition = feedPosition + 1;
        setFeedPosition(nextPosition);
        
    }

    const handleRemoveMeta = async (value) => {
        const newValueList = metaCriteria.filter(meta => meta.value !== value);
        setMetaCriteria(newValueList);

    }

    const handleMessage = async (event) => {
        console.log(userData.user.email);
        document.location.href = `mailto:${userData.user.email}`
    }

    //Update the music record viewed in the DiscoFeed component
    useEffect(() => { 
        if(!musicLoading) {       
            setActiveMusic( musicData.feedMusic[feedPosition]);
        }
    }, [ musicData, feedPosition])

    useEffect(() => {   
        if(activeMusic) {
            setActiveUser(activeMusic.userLink);
        }
    }, [ activeMusic ])
      
    const inputAnim = useSpring({
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        config: config.slow
    });

    if (musicLoading) {
        return <section className="main-background">
            <div className="main-gold">
                <h1 className="serif-bold sm white loading">Loading...</h1>
            </div>
        </section>
    };

    return (
      <section className="main-background">
        <div className="main-gold">
            <article className="disco-search-div">
                <form onSubmit={handleAddMeta} autoComplete="off">
                    <Fade>
                        <label htmlFor="addMeta" className="serif-bold sm">Search genres and instruments:</label>
                    </Fade>
                    <animated.input style={inputAnim} id="addMeta" name="addMeta" className="sans-serif subpara" />
                </form>
            </article>

            <div className="disco-tag-div">
                <ul>
                    {metaCriteria.map((meta, index) => 
                        <li key={index}>
                            <button onClick={()=> handleRemoveMeta(meta.value)} className="serif-bold regular tag"><span className="sans-serif regular">x</span>{meta.value}</button>
                        </li>
                    )}
                </ul>
            </div>

            <article>
                {activeMusic?.userLink ?                 
                    <>
                        <DiscoFeed activeMusic={activeMusic} />                            
                        <Fade delay={600}>
                            <div className="next-btn">
                                <button onClick={handleMessage} className="sans-serif regular">Message</button>
                                <button onClick={handleNextMusic} className="sans-serif regular">Next</button>
                            </div>
                        </Fade>
                    </>
                    :  <h3>No results returned based on search criteria</h3> 
                }
            </article>

          </div>
        </section>
    )
}

export default Discover;