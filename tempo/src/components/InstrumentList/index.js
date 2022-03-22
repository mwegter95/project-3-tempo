import React from 'react';

const InstrumentList = ({ media }) => {
    if (!media.length) {
        return <h3>User doesn't have any instruments yet!</h3>;
    }

    return (
        <div>
            <h3 className='sm'>Instruments:</h3>
            {media.length &&
                media.map(music => (
                    <div key={music.id}>
                        <div className="sans-serif para sm">
                            {music.meta.filter(meta => meta.type.includes('instrument')).map(filteredMeta => (
                                <div key={filteredMeta._id}>
                                    <p>{filteredMeta.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default InstrumentList;