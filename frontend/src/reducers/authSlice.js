import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const token = action.payload.token;
            localStorage.setItem('token', token)
            state.isAuthenticated = true;
            state.token = token;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
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