import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const token = action.payload.token;
            localStorage.setItem('token', token)
            state.token = token;
        },
        logoutUser: (state) => {
            state.token = null
            state.user = null;
            localStorage.clear('token');
        },
        fetchUser: (state, action) => {
            state.user = action.payload;
        },
    },
})

export default authSlice.reducer;
export const { loginUser, fetchUser, logoutUser } = authSlice.actions;