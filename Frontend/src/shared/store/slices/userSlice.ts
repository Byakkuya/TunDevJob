import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {mockDevelopers} from "../../../core/mocks/Developers";
import {users} from "../../../core/mocks/users";

const storedUserInfo = window?.localStorage.getItem("userInfo");
const userFromLocalStorage = storedUserInfo ? JSON.parse(storedUserInfo) : users[1];

const initialState = {
    user: userFromLocalStorage,
};

const userSlice = createSlice({
    name: "userinfo ",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        }
    },
});

export default userSlice.reducer;



export function Login(user: any) {
    return (dispatch: Dispatch) => {
        dispatch(userSlice.actions.login(user));
        console.log(user);
    };
}

export function Logout() {
    return (dispatch: Dispatch) => {
        dispatch(userSlice.actions.logout());
        console.log("logout");
    };
}