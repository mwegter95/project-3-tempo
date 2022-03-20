import React from 'react';

const GenreList = ({ media }) => {
    if (!media.length) {
        return <h3>User doesn't have any genres yet!</h3>;
    }
    
    console.log(media)
    console.log(media[0].meta[0].type)

    return (
        <div>
            <h3 className='sm'>Genres:</h3>
            {media.length &&
                media.map(music => (
                    <div key={music.id}>
                        <div className="sans-serif para sm">
                            {music.meta.filter(meta => meta.type.includes('genre')).map(filteredMeta => (
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

export default GenreList;