import React from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { setCurrentCamera } from '../../redux/slices/capSlice'
import { setCurrentPage } from '../../redux/slices/navSlice'
import { availableCameras, freeVideoStream, getVideoStream, setupCameraAutoReconnect } from '../auxiliars/cameraFunctions'

import CameraWindow from './cameraWindow'
import BackButton from '../auxiliars/backButton'

import '../../styles/camera.css'


const CameraSelector = () => {

    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
    
    const [videoStream, setVideoStream] = useState(null);
    const videoRef = useRef(null);
    const cleanupAutoReconnectRef = useRef(null);
    
    const dispatch = useDispatch()

    useEffect(() => {
        availableCameras().then(cameras => {
            setCameras(cameras)
            setSelectedCamera(cameras[0].deviceId)
        })
    }, []);

    useEffect(() => {
        if (selectedCamera) {
            const stream = videoRef.current.srcObject;

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                console.log('Stream stopped');
            }

            // Limpiar el auto-reconnect anterior si existe
            if (cleanupAutoReconnectRef.current) {
                cleanupAutoReconnectRef.current();
            }

            getVideoStream(selectedCamera).then(stream => {
                setVideoStream(stream)
                videoRef.current.srcObject = stream

                // Configurar auto-reconnect para esta cámara
                cleanupAutoReconnectRef.current = setupCameraAutoReconnect(
                    videoRef.current,
                    selectedCamera,
                    (newStream) => {
                        setVideoStream(newStream);
                    },
                    5,        // maxRetries
                    3000      // retryDelay (3 segundos)
                );
            })
        }

        // Limpiar al desmontar
        return () => {
            if (cleanupAutoReconnectRef.current) {
                cleanupAutoReconnectRef.current();
            }
        };
    }, [selectedCamera]);

    const handleReturn = (e) => {
        e.preventDefault()
        // Limpiar auto-reconnect al salir
        if (cleanupAutoReconnectRef.current) {
            cleanupAutoReconnectRef.current();
        }
        dispatch(setCurrentPage('START'))
    }

    const handleSelect = (e) => {
        e.preventDefault()

        const stream = videoRef.current.srcObject;
    
        // Detener todos los tracks del stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            console.log('Stream stopped');
        }

        // Limpiar auto-reconnect antes de cambiar de página
        if (cleanupAutoReconnectRef.current) {
            cleanupAutoReconnectRef.current();
        }

        dispatch(setCurrentCamera(selectedCamera))
        dispatch(setCurrentPage('CAPTURE'))
    }

    const handleCameraChange = (e) => {
        setSelectedCamera(e.target.value);
    };

    return (
        <div className="camera">
            <h1>Seleccionar Cámara</h1>

            <select value={selectedCamera} onChange={handleCameraChange}>
                {cameras.map(camera => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId}`}
                    </option>
                ))}
            </select>

            <CameraWindow videoRef={videoRef} />

            <div className="camera-buttons">
                <button onClick={handleSelect}>
                    Seleccionar
                </button>
            </div>

            <BackButton onClick={handleReturn} />
            
        </div>
    )

}

export default CameraSelector