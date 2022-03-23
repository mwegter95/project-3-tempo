import React from 'react';

const InstrumentList = ({ media }) => {
    if (!media.length) {
        return <p>No instruments added.</p>;
    }

    return (
        <>
            {media.length &&
                media.map(music => (
                    <p key={music.id}>
                            {music.meta.filter(meta => meta.type.includes('instrument')).map(filteredMeta => (
                               <>
                                  {filteredMeta.value.length ? <span className="serif subpara media-tag">{filteredMeta.value}</span> : ""} 
                               </>
                            ))}
                    </p>
                ))}
        </>
    )
}

export default InstrumentList;