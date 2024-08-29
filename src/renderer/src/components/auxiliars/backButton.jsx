import React from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const BackButton = ({ onClick }) => {
    return (
        <button className="return-button" onClick={onClick}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
    )
}

export default BackButton