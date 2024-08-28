import React from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { setCurrentCamera } from '../redux/slices/capSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/camera.css'



const availableCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(device => device.kind === 'videoinput')
}

const freeVideoStream = (stream) => {
    stream.getTracks().forEach(track => track.stop());
}

const getVideoStream = async (deviceId) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId }
    });
    return stream
}

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

            <div className="video-preview">
                <div className="loading">
                    <FontAwesomeIcon icon={faCameraAlt} size="3x"/>
                    <h3>Cargando...</h3>
                </div>
                <video ref={videoRef} autoPlay playsInline />
            </div>

            <div className="camera-buttons">
                <button onClick={handleSelect}>
                    Seleccionar
                </button>
                <button className="return" onClick={handleReturn}>
                    Volver
                </button>
            </div>
            
        </div>
    )

}

export default CameraSelector