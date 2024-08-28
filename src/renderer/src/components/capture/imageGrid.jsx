import React from 'react';
import { useSelector } from 'react-redux';

import '../../styles/cap-grid.css';


const ImageGrid = () => {
    
        const cap = useSelector((state) => state.cap)
    
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

export default ImageGrid;