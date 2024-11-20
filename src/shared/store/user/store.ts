import { createSlice } from '@reduxjs/toolkit';

import {
    login,
    register,
    logout as logoutUser,
    getProfile,
} from '~/shared/api/medicalSystem/user';
import { sharedConfigTypes } from '~/shared/config';
import { checkToken, removeToken, setToken } from '~/shared/store/cookie';

type State = {
    user: sharedConfigTypes.User | null;
    isAuth: boolean;
    isLoading: boolean;
};

const initialState: State = {
    user: null,
    isAuth: checkToken(),
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuth = true;
            setToken(action.payload.token);
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true;
            setToken(action.payload.token);
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
            removeToken();
        });

        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getProfile.rejected, (state) => {
                state.isAuth = false;
                state.user = null;
                state.isLoading = false;
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
