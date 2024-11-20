import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { store as dictionaryStore } from './dictionary';
import { store as inspectionStore } from './inspection';
import { store as patientStore } from './patient';
import { store as userStore } from './user';

const { dictionaryReducer } = dictionaryStore;
const { inspectionReducer } = inspectionStore;

const { patientReducer } = patientStore;
const { userReducer } = userStore;

export const rootReducer = combineReducers({
    patient: patientReducer,
    user: userReducer,
    dictionary: dictionaryReducer,
    inspection: inspectionReducer,
});

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
