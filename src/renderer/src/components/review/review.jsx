import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/navSlice";
import { resetSelected, resetImages } from "../../redux/slices/capSlice";
import { faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BackButton from "../auxiliars/backButton";
import ImageGrid from "../capture/imageGrid";
import ImageModal from "./imageModal";
import MessageModal from "./messageModal";

import "../../styles/review.css";

const Review = () => {

    const cap = useSelector((state) => state.cap)
    const dispatch = useDispatch()

    const [seeImage, setSeeImage] = useState(false)
    const [image, setImage] = useState(null)
    const [noSelected, setNoSelected] = useState(false)
    const [onSelection, setOnSelection] = useState(false)
    const [name, setName] = useState("")
    const [confirmClose, setConfirmClose] = useState(false)
    const [succesful, setSuccesful] = useState(false)

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

    const openSave = async (e) => {
        e.preventDefault()
        const selectedImages = cap.images.filter((image) => image.selected)

        if (selectedImages.length === 0) {
            setNoSelected(true)
            return
        }
        else {
            setOnSelection(true)
            return 
        }

    }

    const saveSelection = async () => {
        const selectedImages = cap.images.filter((image) => image.selected)

        // Get only the image data
        const files = selectedImages.map((image) => image.image)
        const result = await window.api.files.saveImages(files, name)

        if (result) {
            dispatch(resetSelected())
            console.log("Images saved successfully")
            setSuccesful(true)
        } else {
            console.log("Error saving images")
        }
        
    }

    const endProgram = (e) => {
        e.preventDefault()
        dispatch(setCurrentPage('START'))
        dispatch(resetImages())
        
    }


    return (
        <div className="review">
            <h1>Seleccionar imágenes</h1>
            <ImageGrid clickable={true} openModal={openModal}/>
            <BackButton onClick={handleReturn}/>

            <div className="review-button-container">
                <button
                    onClick={openSave}
                >
                    <FontAwesomeIcon icon={faSave} size="2x"/>
                    <span>Guardar selección</span>
                </button>
                <button className="finish-button"
                    onClick={() => setConfirmClose(true)}
                >
                    <FontAwesomeIcon icon={faClose} size="2x"/>
                    <span>Finalizar</span>
                </button>
            </div>

            {seeImage && (
                <ImageModal image={image} onClose={closeModal}/>
            )}

            {noSelected && (
                <MessageModal message="No se ha seleccionado ninguna imagen" 
                    onClose={() => 
                        setNoSelected(false)
                    }
                />
            )}

            {onSelection && (
                <MessageModal message="Ingresar nombre del paciente" 
                    onClose={() => 
                        setOnSelection(false)
                    }
                >
                    <input 
                        type="text" value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del paciente"
                    />

                    <button className="save-button"
                        disabled={!name}
                        onClick={(e) => {
                            saveSelection()
                            setOnSelection(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faSave} size="1x"/>
                        <span>Guardar</span>
                    </button>
                </MessageModal>
            )  
            }

            {succesful && (
                <MessageModal message="Imágenes guardadas exitosamente" 
                    onClose={() => 
                        setSuccesful(false)
                    }
                />
            )  
            }

            {confirmClose && (
                <MessageModal message="¿Desea finalizar el programa?" 
                    onClose={() => 
                        setConfirmClose(false)
                    }
                >
                <div className="review-button-container">
                    <button 
                        onClick={endProgram}
                    >
                        <span>Si</span>
                    </button>

                    <button
                        onClick={() => setConfirmClose(false)}
                    >
                        <span>No</span>
                    </button>
                </div>
                </MessageModal>
            )  
            }
            
        </div>
    )
}

export default Review;