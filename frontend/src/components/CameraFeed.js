import React, { useRef, useEffect, useState } from 'react';

/*gets the prop from parent component */
export const CameraFeed = ({ onPhotoData }) => {
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
        // const width = 414;
        // const height = width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        // Ratio of the video's intrisic dimensions
        let videoRatio = video.videoWidth / video.videoHeight;
        // The width and height of the video element
        let width = video.offsetWidth, height = video.offsetHeight;
        // The ratio of the element's width to its height
        let elementRatio = width / height;
        // If the video element is short and wide
        if (elementRatio > videoRatio) width = height * videoRatio;
        // It must be tall and thin, or exactly equal to the original ratio
        else height = width / videoRatio;

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
                .then(data => {
                    console.log(data)
                    /*sets the props data with the handler function */
                    onPhotoData(data.emotion, data.status);
                })
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

    const [toggleButton, setButton] = useState({
        action: true,
        text: "SNAP!"
    });
    const handleButtonClick = () => {
        if (toggleButton.action) {
            setButton({ ...toggleButton, action: false, text: "NEXT!" });
            takePhoto();
        } else {
            setButton({ ...toggleButton, action: true, text: "SNAP!" });
            closePhoto();
        }
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <div className='camera-container'>
            <div className='camera'>
                <video ref={videoRef}></video>
            </div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
            </div>
            <button className="camera-button" onClick={handleButtonClick}>{toggleButton.text}</button>
        </div>
    )
}
