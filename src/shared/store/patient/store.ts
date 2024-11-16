import { createSlice } from '@reduxjs/toolkit';

import { User } from '~/shared/api/medicalSystem/models';

type State = {
    user: User | null;
};

const initialState: State = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        removeUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
