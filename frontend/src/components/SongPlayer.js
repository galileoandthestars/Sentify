import React from "react";
import { Spotify } from 'react-spotify-embed'

export const SongPlayer = () => {
    return (
        <div className="song-player">
            <Spotify className="spotifyEmbedding" link="https://open.spotify.com/track/4OQq1bcP12GQQXJNupxqfR?si=e651071ef4d94ca6" />
        </div>
    )
}
