import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    camera: null,
}

const capSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCurrentCamera: (state, action) => {
            state.camera = action.payload;
        }
    }
});

export const {
    setCurrentCamera
} = capSlice.actions;

export default capSlice.reducer;