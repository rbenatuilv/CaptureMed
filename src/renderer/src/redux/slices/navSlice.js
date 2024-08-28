import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: "START",
}

const allowedPages = ["START", "CAMERA"];

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            if (allowedPages.includes(action.payload)) {
                state.currentPage = action.payload;
            }
        }
    }
});

export const {
    setCurrentPage
} = navSlice.actions;

export default navSlice.reducer;