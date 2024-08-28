import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    camera: null,
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
            state.images.push(action.payload);
        },
        resetImages: (state) => {
            state.images = [];
        }
    }
});

export const {
    setCurrentCamera,
    addImage,
    resetImages
} = capSlice.actions;

export default capSlice.reducer;