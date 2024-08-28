import React from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { setCurrentCamera } from '../../redux/slices/capSlice'
import { setCurrentPage } from '../../redux/slices/navSlice'
import { availableCameras, freeVideoStream, getVideoStream } from '../auxiliars/cameraFunctions'

import CameraWindow from './cameraWindow'
import BackButton from '../auxiliars/backButton'

import '../../styles/camera.css'


const CameraSelector = () => {

    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
    
    const [videoStream, setVideoStream] = useState(null);
    const videoRef = useRef(null);
    
    const dispatch = useDispatch()

    useEffect(() => {
        availableCameras().then(cameras => {
            setCameras(cameras)
            setSelectedCamera(cameras[0].deviceId)
        })
    }, []);

    useEffect(() => {
        if (selectedCamera) {
            if (videoStream) {
                freeVideoStream(videoStream)
            }

            getVideoStream(selectedCamera).then(stream => {
                setVideoStream(stream)
                videoRef.current.srcObject = stream
            })
        }
    }, [selectedCamera]);

    const handleReturn = (e) => {
        e.preventDefault()
        dispatch(setCurrentPage('START'))
    }

    const handleSelect = (e) => {
        e.preventDefault()

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