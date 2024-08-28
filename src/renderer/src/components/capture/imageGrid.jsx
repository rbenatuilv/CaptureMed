import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSelectImage } from '../../redux/slices/capSlice';

import '../../styles/cap-grid.css';


const ImageGrid = ({clickable}) => {
    
        const cap = useSelector((state) => state.cap)
        const dispatch = useDispatch()

        if (!clickable){
            return (
                <div className="image-grid">
                    {cap.images.map((image) => (
                        <div key={image.id} className="image-container">
                            <img src={image.image} alt="captured" className="image" />
                        </div>
                    ))}
                </div>
            );
        }

        const createClickableContainer = (image) => {

            const handleClick = (e) => {
                e.preventDefault();
                console.log("Clicked on image: ", image.id);
                dispatch(toggleSelectImage(image.id));
            }

            return (
                <div 
                    key={image.id} 
                    className={`image-container-click ${image.selected ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    <img src={image.image} alt="captured" className="image" />
                </div>
            );
        }

        return (
            <div className="image-grid-click">
                {cap.images.map((image) => (
                    createClickableContainer(image)
                ))}
            </div>
        );


}

export default ImageGrid;