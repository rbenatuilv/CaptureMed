import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/navSlice";
import { getVideoStream, freeVideoStream } from "../auxiliars/cameraFunctions";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addImage, resetImages } from "../../redux/slices/capSlice";

import CameraWindow from "../camera/cameraWindow";
import BackButton from "../auxiliars/backButton";
import ImageGrid from "./imageGrid";

import '../../styles/capture.css'


const Capture = () => {

    const cap = useSelector((state) => state.cap)
    const dispatch = useDispatch()

    const videoRef = useRef(null);
    const canvasRef = useRef(null);



    useEffect(() => {
        getVideoStream(cap.camera).then(stream => {
            videoRef.current.srcObject = stream
        } ).catch(err => console.error(err))    
        const canvas = document.createElement('canvas');
        canvasRef.current = canvas;
    }, [cap.camera]);

    const handleReturn = (e) => {
        e.preventDefault()

        const stream = videoRef.current.srcObject;

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            console.log('Stream stopped');
        }
        
        dispatch(setCurrentPage('CAMERA'))
        dispatch(resetImages())
    }

    const handleCapture = (e) => {
        e.preventDefault()

        if (!videoRef.current) {
            console.error('Video reference is not available');
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/png');

        dispatch(addImage({ image: image }));

        console.log('Image captured');
    }

    const handleNext = (e) => {
        e.preventDefault()

        const stream = videoRef.current.srcObject;
    
        // Detener todos los tracks del stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            console.log('Stream stopped');
        }
        dispatch(setCurrentPage('REVIEW'))

        
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                handleCapture(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleCapture]); 

    return (
        <div className="capture">
            <h1>Capturador</h1>     

            <div className="capture-page">
                <CameraWindow videoRef={videoRef} />
                <ImageGrid />
            </div>

            <div className="button-container">
                <button onClick={handleCapture}>
                    <FontAwesomeIcon icon={faCamera} size="2x"/>
                </button>

                <button onClick={handleNext}>
                    <FontAwesomeIcon icon={faCheck} size="2x"/>
                </button>
            </div>

            <BackButton onClick={handleReturn} />

        </div>
    )
}

export default Capture;