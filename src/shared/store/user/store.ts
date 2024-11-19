import { createSlice } from '@reduxjs/toolkit';

import { User } from '~/shared/api/medicalSystem/models';
import { checkToken, removeToken } from '~/shared/store/cookie';

type State = {
    user: User | null;
    isAuth: boolean;
};

const initialState: State = {
    user: null,
    isAuth: checkToken(),
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
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
