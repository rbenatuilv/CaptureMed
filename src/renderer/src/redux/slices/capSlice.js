import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    camera: null,
    imagesId: 0,
    images: []
}

const capSlice = createSlice({
    name: 'cap',
    initialState,
    reducers: {
        setCurrentCamera: (state, action) => {
            state.camera = action.payload;
        },
        addImage: (state, action) => {
            state.imagesId += 1;
            state.images.push({ 
                id: state.imagesId, 
                image: action.payload.image,
                selected: false
            });
        },
        resetSelected: (state) => {
            state.images.forEach((image) => image.selected = false);
        },
        resetImages: (state) => {
            state.images = [];
        },
        toggleSelectImage: (state, action) => {
            const image = state.images.find((image) => image.id === action.payload);
            if (image) {
                image.selected = !image.selected;
            }
        }
    }
});

export const {
    setCurrentCamera,
    addImage,
    resetImages,
    toggleSelectImage,
    resetSelected
} = capSlice.actions;

export default capSlice.reducer;