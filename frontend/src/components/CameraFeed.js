import React, { useRef, useEffect, useState } from 'react';

export const CameraFeed = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        // Create data URL for the image
        const dataURL = photo.toDataURL();

        // Store the image in local storage
        localStorage.setItem('photo', dataURL);

        if (localStorage.getItem('photo')) {
            // Image data exists in localStorage
            const imageData = localStorage.getItem('photo');
            // Send image data to Flask API
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageData })
            };
            fetch('/send-image', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        } else {
            // Image data does not exist in localStorage
            console.log('No');
        }

        setHasPhoto(true);
    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);

        localStorage.clear();
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <div className='camera-container'>
            <div className={'camera'}>
                <video ref={videoRef}></video>
                <button className='cameraFeed-btn' onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button className="cameraFeed-btn2" onClick={closePhoto}>NEXT!</button>
            </div>
        </div>
    )
}