import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { store as userStore } from './user';

const { userReducer } = userStore;

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
