import { configureStore } from '@reduxjs/toolkit';
import navSlice from './slices/navSlice';
import capSlice from './slices/capSlice';


const store = configureStore({
    reducer: {
        nav: navSlice,
        cap: capSlice
    }
});

export default store;