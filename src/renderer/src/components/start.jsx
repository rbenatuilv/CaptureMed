import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../redux/slices/navSlice'

import logo from '../assets/logo.png'
import '../styles/start.css'


const Start = () => {

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setCurrentPage('CAMERA'))
    }


    return (
        <div className="start">
            <img src={logo} alt="Logo" className="logo" />
            <h1>CaptureMed</h1>
            <h3>Una aplicación de captura de imagenes médicas</h3>

            <button className="start-button" onClick={handleClick}>
                Iniciar
            </button>
        </div>
    )
}

export default Start