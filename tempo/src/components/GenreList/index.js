import React from 'react';

const GenreList = ({ genres }) => {
    if (!genres.length) {
        return <h3>User doesn't have any genres yet!</h3>;
    }

    return (
        <div>
            {genres.length &&
                genres.map(genre => (
                    <div key={genre.id}>
                        <p className="sans-serif para">
                            {genre.name}
                        </p>
                    </div>
                ))}
        </div>
    )
}

export default GenreList;