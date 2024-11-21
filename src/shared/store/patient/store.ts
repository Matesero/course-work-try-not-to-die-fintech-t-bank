import { createSlice } from '@reduxjs/toolkit';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';

const { getCard, getInspectionsWithoutChild } = medicalSystemApi.patient;

type State = {
    id: string | null;
    data: sharedConfigTypes.Patient | null;
    isDeath: boolean | undefined;
    isLoading: boolean;
    inspectionsWithoutChild: sharedConfigTypes.InspectionWithoutChild[];
};

const initialState: State = {
    id: null,
    data: null,
    isDeath: undefined,
    isLoading: false,
    inspectionsWithoutChild: [],
};

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
        setData(state, action) {
            state.data = action.payload;
        },
        removePatient(state) {
            state.id = null;
            state.data = null;
            state.isDeath = undefined;
            state.inspectionsWithoutChild = [];
        },
        setIsDeath(state, action) {
            state.isDeath = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCard.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getCard.rejected, (state) => {
                state.id = null;
                state.data = null;
                state.isLoading = false;
            });

        builder
            .addCase(getInspectionsWithoutChild.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInspectionsWithoutChild.fulfilled, (state, action) => {
                state.inspectionsWithoutChild = action.payload;
                state.isLoading = false;
            });
    },
});

export const { setId, setData, setIsDeath, removePatient } =
    patientSlice.actions;
export const patientReducer = patientSlice.reducer;
