import { createSlice } from '@reduxjs/toolkit';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { checkToken, removeToken, setToken } from '~/shared/store/cookie';

const { login, register, logout, getProfile, putProfile } =
    medicalSystemApi.user;

type State = {
    user: sharedConfigTypes.User | null;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
};

const initialState: State = {
    user: null,
    isAuth: checkToken(),
    isLoading: false,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuth = false;
            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.error = '';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuth = true;
                setToken(action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder
            .addCase(login.pending, (state) => {
                state.error = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                setToken(action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
            removeToken();
        });

        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isAuth = false;
                state.user = null;
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder.addCase(putProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
