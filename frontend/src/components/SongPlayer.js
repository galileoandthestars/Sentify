import React from "react";
import { Spotify } from 'react-spotify-embed'

export const SongPlayer = (songURL) => {
    console.log(songURL);
    return (
        <div className="song-player">
            <Spotify className="spotifyEmbedding" link={songURL['songUrl']} />
        </div>
    )
}
