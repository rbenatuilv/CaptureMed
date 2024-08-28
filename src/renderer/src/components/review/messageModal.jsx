import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/message-modal.css'; // Asegúrate de crear este archivo para los estilos


const MessageModal = ({ message, onClose, children }) => {
    return (
        <div className="msg-modal-overlay" onClick={onClose}>
            <div className="msg-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                {children}
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} size="1x"/>
                </button>
            </div>
        </div>
    );
}

export default MessageModal;