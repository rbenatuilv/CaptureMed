import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: "START",
}

const allowedPages = ["START", "CAMERA", "CAPTURE", "REVIEW"];

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            if (allowedPages.includes(action.payload)) {
                console.log("Setting current page to: ", action.payload);
                state.currentPage = action.payload;
            }
        }
    }
});

export const {
    setCurrentPage
} = navSlice.actions;

export default navSlice.reducer;