import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/navSlice";
import { resetSelected } from "../../redux/slices/capSlice";
import { faSave, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BackButton from "../auxiliars/backButton";
import ImageGrid from "../capture/imageGrid";
import ImageModal from "./imageModal";

import "../../styles/review.css";

const Review = () => {

    const cap = useSelector((state) => state.cap)
    const dispatch = useDispatch()

    const [isDisabledSee, setIsDisabledSee] = useState(true)
    const [seeImage, setSeeImage] = useState(false)
    const [image, setImage] = useState(null)

    

    const closeModal = (e) => {
        e.preventDefault()
        setSeeImage(false)
    }


    const handleReturn = (e) => {
        e.preventDefault()
        dispatch(resetSelected())
        dispatch(setCurrentPage('CAPTURE'))
    }

    const openModal = (image) => {
        setSeeImage(true)
        setImage(image)
    }

    const saveSelection = (e) => {
        e.preventDefault()
        const selectedImages = cap.images.filter((image) => image.selected)
        
    }


    return (
        <div className="review">
            <h1>Seleccionar imágenes</h1>
            <ImageGrid clickable={true} openModal={openModal}/>
            <BackButton onClick={handleReturn}/>

            <div className="review-button-container">
                <button
                    onClick={saveSelection}
                >
                    <FontAwesomeIcon icon={faSave} size="2x"/>
                    <span>Guardar selección</span>
                </button>
            </div>

            {seeImage && (
                <ImageModal image={image} onClose={closeModal}/>
            )}
            
        </div>
    )
}

export default Review;