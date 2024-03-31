import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {},
        token: null
    },
    reducers: {
        login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        },
        logout: (state) => {
        state.isAuthenticated = false;
        state.user = {};
        state.token = null;
        }
    }
    });
    export const { login, logout } = authReducer.actions;