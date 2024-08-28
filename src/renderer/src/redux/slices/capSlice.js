import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    camera: null,
    imagesId: 0,
    selectedCount: 0,
    firstSelected: null,
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
            state.selectedCount = 0;
            state.firstSelected = null;
            state.images.forEach((image) => image.selected = false);
        },
        resetImages: (state) => {
            state.images = [];
            state.selectedCount = 0;
            state.firstSelected = null;
        },
        toggleSelectImage: (state, action) => {
            const image = state.images.find((image) => image.id === action.payload);
            if (image) {
                image.selected = !image.selected;
                state.selectedCount += image.selected ? 1 : -1;
                if (state.selectedCount === 1) {
                    state.firstSelected = state.images.find((image) => image.selected).image;
                } else if (state.selectedCount === 0) {
                    state.firstSelected = null;
                }
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