import { createSlice } from '@reduxjs/toolkit';

import { getCard } from '~/shared/api/medicalSystem/patient';
import { getInspectionsWithoutChild } from '~/shared/api/medicalSystem/patient';
import { sharedConfigTypes } from '~/shared/config';

type State = {
    id: string | null;
    data: sharedConfigTypes.Patient | null;
    isLoading: boolean;
    inspectionsWithoutChild: sharedConfigTypes.InspectionWithoutChild[];
};

const initialState: State = {
    id: null,
    data: null,
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
            state.inspectionsWithoutChild = [];
        },
        removeInspectionsWithoutChild(state) {
            state.inspectionsWithoutChild = [];
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

export const { setId, setData, removePatient } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
