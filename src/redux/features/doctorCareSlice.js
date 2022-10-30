import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: 'Thanh Huy',
    isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
    adminInfo: JSON.parse(localStorage.getItem('adminInfo')) || null,
    roleLogin: JSON.parse(localStorage.getItem('roleLogin')) || null,
};

const doctorCareSlice = createSlice({
    name: 'doctorCare',
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.isLogin = action.payload;
            localStorage.setItem('isLogin', JSON.stringify(action.payload));
        },
        setAdminInfo: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        setRoleLogin: (state, action) => {
            state.roleLogin = action.payload;
            localStorage.setItem('roleLogin', JSON.stringify(action.payload));
        },
    },
});

export const { setLogIn, setAdminInfo, setRoleLogin } = doctorCareSlice.actions;

export default doctorCareSlice.reducer;
