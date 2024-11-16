import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { userSlice } from './user';

const { userReducer } = userSlice;

export const rootReducer = combineReducers({
    user: userReducer,
});

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
