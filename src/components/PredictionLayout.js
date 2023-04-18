import React from 'react';
import { CameraFeed } from './CameraFeed';

export const PredictionLayout =() => {

    return(
        <div className='predictionLayout'>
            <div className='predictionFeed'>
            <CameraFeed/>
            </div>
            <div className='predictionText'>
            <h3>You are feeling </h3>

            </div>
        </div>
    )
}