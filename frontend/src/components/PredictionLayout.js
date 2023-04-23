import React, { useState, useEffect } from 'react';
import { CameraFeed } from './CameraFeed';

export const PredictionLayout = ({ hasEmotion }) => {
    const [emotion, setEmotion] = useState('...')
    const [icon, setIcon] = useState('');
    const [emotionClass, setEmotionClass] = useState('');

    /*Function that sets the emotion value, it is sent to 
    the camera feed as a props */
    const handlePhotoData = (emotion, status) => {
        /*Checks if the takePhoto function was succesful */
        if (status === 'success') {
            setEmotion(emotion);
        }
        else {
            setEmotion('no funciona');
        }

        if (emotion === 'happy') {
            setEmotionClass('emotion-happy');
        }
        else if (emotion === 'sad') {
            setEmotionClass('emotion-sad');
        }
        else if (emotion === 'angry') {
            setEmotionClass('emotion-angry');
        }
        else if (emotion === 'fear') {
            setEmotionClass('emotion-fear');
        }
        else if (emotion === 'neutral') {
            setEmotionClass('emotion-neutral');
        }
        else if (emotion === 'disgust') {
            setEmotionClass('emotion-disgust');
        }
        else if (emotion === 'surprise') {
            setEmotionClass('emotion-surprise');
        }
        else {
            console.log('Empty emotion value');
        }

        hasEmotion(emotion);
    }

    return (
        <div className='predictionLayout'>
            <div className='predictionFeed'>
                {/*Handle photo data is passed as a prop called onPhotoData */}
                <CameraFeed onPhotoData={handlePhotoData} />
            </div>
            <div className='predictionText'>
                <h3>You are feeling</h3>
                {/* <img src={icon} alt="emotion-icon"></img> */}
                <p className={'emotion ' + emotionClass}>{emotion}</p>
            </div>
        </div>
    )
}
