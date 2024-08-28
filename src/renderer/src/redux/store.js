import { configureStore } from '@reduxjs/toolkit';
import navSlice from './slices/navSlice';


const store = configureStore({
    reducer: {
        nav: navSlice,
    }
});

export default store;