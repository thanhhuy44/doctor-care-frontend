import { configureStore } from '@reduxjs/toolkit';
import doctorCareReducer from './features/doctorCareSlice';

export default configureStore({
    reducer: {
        doctorCare: doctorCareReducer,
    },
});
