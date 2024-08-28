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


    useEffect(() => {
        if (cap.selectedCount === 1){
            setIsDisabledSee(false)
        } else {
            setIsDisabledSee(true)
        }
    }, [cap.selectedCount])
    

    const handleSee = (e) => {
        e.preventDefault()
        setSeeImage(!seeImage)
    }


    const handleReturn = (e) => {
        e.preventDefault()
        dispatch(resetSelected())
        dispatch(setCurrentPage('CAPTURE'))
    }


    return (
        <div className="review">
            <h1>Seleccionar imágenes</h1>
            <ImageGrid clickable={true}/>
            <BackButton onClick={handleReturn}/>

            <div className="button-container">
                <button className="see-button" disabled={isDisabledSee} onClick={handleSee}>
                    <FontAwesomeIcon icon={faEye} size="2x"/>
                    <span>Ver Imagen</span>
                </button>
                <button>
                    <FontAwesomeIcon icon={faSave} size="2x"/>
                    <span>Guardar selección</span>
                </button>
            </div>

            {seeImage && (
                <ImageModal image={cap.firstSelected} onClose={handleSee}/>
            )}
            
        </div>
    )
}

export default Review;