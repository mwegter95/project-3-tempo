import React from 'react';

const GenreList = ({ userMusic }) => {
    if (!userMusic.length) {
        return <h3>User doesn't have any genres yet!</h3>;
    }
    

    return (
        <div>
            <h3 className='sm'>Genres:</h3>
            {userMusic.length &&
                userMusic.map(music => (
                    <div key={music.id}>
                        <p className="sans-serif para sm">
                            {music.genre}
                        </p>
                    </div>
                ))}
        </div>
    )
}

export default GenreList;