import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/navSlice";
import { getVideoStream, freeVideoStream } from "../auxiliars/cameraFunctions";
import { faCamera, faCheck, faCameraRotate } from '@fortawesome/free-solid-svg-icons'
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
    const previewTimeoutRef = useRef(null);
    
    const [showPreview, setShowPreview] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isReloadingCamera, setIsReloadingCamera] = useState(false);

    const initializeCameraStream = useCallback(async () => {
        if (!cap.camera || !videoRef.current) {
            return;
        }

        try {
            const currentStream = videoRef.current.srcObject;
            if (currentStream) {
                freeVideoStream(currentStream);
            }

            const stream = await getVideoStream(cap.camera);
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('No se pudo iniciar la cámara seleccionada', error);
        }
    }, [cap.camera]);

    const clearPreviewTimeout = useCallback(() => {
        if (previewTimeoutRef.current) {
            clearTimeout(previewTimeoutRef.current);
            previewTimeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        initializeCameraStream();
        const canvas = document.createElement('canvas');
        canvasRef.current = canvas;
    }, [initializeCameraStream]);

    useEffect(() => {
        return () => {
            clearPreviewTimeout();
            const stream = videoRef.current?.srcObject;
            if (stream) {
                freeVideoStream(stream);
            }
        };
    }, [clearPreviewTimeout]);

    const handleReturn = (e) => {
        e.preventDefault()

        clearPreviewTimeout();

        const stream = videoRef.current?.srcObject;

        if (stream) {
            freeVideoStream(stream);
        }
        
        dispatch(setCurrentPage('CAMERA'))
        dispatch(resetImages())
    }

    const handleCapture = useCallback((e) => {
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

        clearPreviewTimeout();

        // Mostrar preview de la foto capturada
        setPreviewImage(image);
        setShowPreview(true);
        
        // Ocultar preview después de 1.5 segundos
        previewTimeoutRef.current = setTimeout(() => {
            setShowPreview(false);
            previewTimeoutRef.current = null;
        }, 1500);

        console.log('Image captured');
    }, [dispatch, clearPreviewTimeout]);

    const handleNext = (e) => {
        e.preventDefault()

        clearPreviewTimeout();

        const stream = videoRef.current?.srcObject;
    
        // Detener todos los tracks del stream
        if (stream) {
            freeVideoStream(stream);
        }
        dispatch(setCurrentPage('REVIEW'))
    }

    const handleReloadCamera = async (e) => {
        e.preventDefault();

        if (!cap.camera || isReloadingCamera) {
            return;
        }

        setIsReloadingCamera(true);
        try {
            await initializeCameraStream();
        } finally {
            setIsReloadingCamera(false);
        }
    };

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
                <div className="camera-container">
                    <button
                        type="button"
                        className="camera-reload-button"
                        onClick={handleReloadCamera}
                        disabled={!cap.camera || isReloadingCamera}
                    >
                        {isReloadingCamera ? 'Reconectando cámara...' : <FontAwesomeIcon icon={faCameraRotate} size="2x"/>}
                    </button>
                    <CameraWindow videoRef={videoRef} />
                </div>
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

            {showPreview && previewImage && (
                <div className="photo-preview-overlay">
                    <img src={previewImage} alt="Photo preview" className="photo-preview" />
                </div>
            )}

        </div>
    )
}

export default Capture;