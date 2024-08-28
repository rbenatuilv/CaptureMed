import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/image-modal.css'; // Asegúrate de crear este archivo para los estilos

const ImageModal = ({ image, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={image} alt="captured" className="image" />
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} size="1x"/>
                </button>
            </div>
        </div>
    );
}

export default ImageModal;