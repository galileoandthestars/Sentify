import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { HiOutlineMenu } from 'react-icons/hi';
import { SiMusicbrainz } from 'react-icons/si';
import { HiHeart } from 'react-icons/hi';
import { RiPlayListFill } from 'react-icons/ri';
import { MdRecommend } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { PredictionLayout } from './PredictionLayout';
import { SongPlayer } from './SongPlayer';
import { useState } from 'react';

export const DashBoardLayout = () => {
    const { collapseSidebar } = useProSidebar();
    const [state, setState] = useState({
        emotion: false,
        songUrl: ''
    });
    // const [hasEmotion, setEmotion] = useState(false);
    // const [songURL, setSongURL] = useState("");

    // let songURL = "";

    const setHasEmotion = async (emotion) => {
        const song_url = await fetchSong(emotion);
        console.log(song_url);
        setState({ ...state, songUrl: song_url["song-url"], emotion: true });
    }

    const fetchSong = async (emotion) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion })
        };
        return await fetch('/recommend-song', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
                // setSongURL(data);
                // songURL = data;
            })
            .catch(error => console.error(error));
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', color: '#000000', fontFamily: 'monospace', border: 'none' }}>
            <Sidebar style={{ height: "100vh", transition: '700', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                <Menu >
                    <MenuItem
                        icon={< HiOutlineMenu />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}

                        <h2 style={{ marginTop: "10px" }}><SiMusicbrainz style={{ marginRight: "5px", marginBottom: '4px' }} />Sentify</h2>
                    </MenuItem>

                    <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
                    <MenuItem icon={<HiHeart />}>Liked Songs</MenuItem>
                    <MenuItem icon={<RiPlayListFill />}>Playlist</MenuItem>
                    <MenuItem icon={<MdRecommend />}>Recommendations</MenuItem>
                    <MenuItem icon={<CgProfile />}>Profile</MenuItem>
                    <MenuItem icon={<FiLogOut />} style={{ marginBottom: '-10px' }}>Logout</MenuItem>

                </Menu>

            </Sidebar>
            <main>
                <h1 style={{ color: '#000000', marginLeft: "4rem", marginTop: "20px" }}>
                    Sentify Dashboard
                </h1>

                <div className='dashboard-container'>
                    <PredictionLayout hasEmotion={setHasEmotion} />

                    {!state.emotion &&
                        <div className='before-song-player'>
                            <p>Your recommended song will appear here after a picture is taken.</p>
                        </div>
                    }
                    {state.emotion &&
                        <SongPlayer songUrl={state.songUrl} />
                    }
                </div>
            </main >
        </div >
    );
}
