import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: 'Thanh Huy',
};

const doctorCareSlice = createSlice({
    name: 'doctorCare',
    initialState,
    reducers: {},
});

export const {} = doctorCareSlice.actions;

export default doctorCareSlice.reducer;
