import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isLogin: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLogin = action.payload.isLogin;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isLogin = false;
            state.user = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;