import React from 'react';

const GenreList = ({ media }) => {
    if (!media.length) {
        return <p>No genres added.</p>;
    }

    return (
        <>
            {media.length &&
                media.map(music => (
                    <p key={music.id}>
                            {music.meta.filter(meta => meta.type.includes('genre')).map(filteredMeta => (
                                <>
                                {filteredMeta.value.length ? <span className="serif subpara media-tag">{filteredMeta.value}</span> : ""}
                                </>
                            ))}
                    </p>
                ))}
        </>
    )
}

export default GenreList;