import React from 'react'
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/cam-window.css'


const CameraWindow = ({ videoRef }) => {
    return (
        <div className="video-preview">
            <div className="loading">
                <FontAwesomeIcon icon={faCameraAlt} size="3x"/>
                <h3>Cargando...</h3>
            </div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    )
}

export default CameraWindow