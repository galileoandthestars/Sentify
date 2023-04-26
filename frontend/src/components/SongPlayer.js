import React from "react";
import { useEffect, useRef, useState } from "react";
import { Spotify } from 'react-spotify-embed';
import { AiFillFastForward } from 'react-icons/ai';
import { AiFillFastBackward } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

export const SongPlayer = (embedInfo) => {
    console.log(embedInfo);
    console.log(embedInfo.embedInfo[1]);

    let songQueue = useRef(null);
    let index = useRef(null);
    let hasGoneBack = useRef(null);

    const [songInfo, setSongInfo] = useState({
        title: embedInfo.embedInfo[0].title[0],
        src: embedInfo.embedInfo[0].src[0],
        emotion: embedInfo.embedInfo[1]
    });

    useEffect(() => {
        songQueue.current = [[embedInfo.embedInfo[0].title[0], embedInfo.embedInfo[0].src[0]]];
        index.current = 0;
        hasGoneBack.current = false;
        setSongInfo({ ...songInfo, title: embedInfo.embedInfo[0].title[0], src: embedInfo.embedInfo[0].src[0], emotion: songInfo.emotion })
    }, [embedInfo]);

    // const embeddingRef = useRef(null);

    // useEffect(() => {
    //     let color = embeddingRef.current.style.backgroundColor;
    //     console.log(color);
    // }, [embeddingRef]);

    // function handleLoad() {
    //     // console.log(embeddingRef.current.style.backgroundColor);
    //     let songEmbedding = document.getElementsByClassName("CSvhaUqpjr9_ZyxY3M6j");
    //     console.log(songEmbedding);
    //     let color = window.getComputedStyle(songEmbedding).getPropertyValue("background-color");
    //     console.log(color);
    // }

    const recommendNext = async () => {
        if (!hasGoneBack.current) {
            const newEmbedInfo = await fetchSong(songInfo.emotion);

            console.log(newEmbedInfo);

            songQueue.current.push([newEmbedInfo["embed-info"].title, newEmbedInfo["embed-info"].src])
            index.current = index.current + 1;
            setSongInfo({ ...songInfo, title: newEmbedInfo["embed-info"].title, src: newEmbedInfo["embed-info"].src, emotion: songInfo.emotion });
        } else {
            index.current = index.current + 1;

            if (index.current === (songQueue.current.length - 1)) {
                hasGoneBack.current = false;
            }

            setSongInfo({ ...songInfo, title: songQueue.current[index.current][0], src: songQueue.current[index.current][1] })
        }
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
            })
            .catch(error => console.error(error));
    }

    function goBack() {
        if (index.current === 0) {
            return;
        }

        hasGoneBack.current = true;
        index.current = index.current - 1;
        setSongInfo({ ...songInfo, title: songQueue.current[index.current][0], src: songQueue.current[index.current][1] })
    }

    return (
        <div className="song-player-container">
            {/* <Spotify className="spotifyEmbedding" link={songURL['songUrl']} /> */}
            {/* <iframe id="song-embedding" ref={embeddingRef} onLoad={handleLoad} style={{ borderRadius: "12px" }} width="450px" height="400px" title={embedInfo.embedInfo.title[0]} frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={embedInfo.embedInfo.src[0]}></iframe> */}
            <iframe style={{ borderRadius: "12px" }} width="450px" height="400px" title={songInfo.title} frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={songInfo.src}></iframe>
            <div className="button-container">
                <button className="song-button recommendation" onClick={goBack}><AiFillFastBackward /></button>
                <button className="song-button subjective"><AiFillHeart /></button>
                <button className="song-button subjective"><AiFillDislike /></button>
                <button className="song-button recommendation" onClick={recommendNext}><AiFillFastForward /></button>
            </div>
        </div >
    )
}
