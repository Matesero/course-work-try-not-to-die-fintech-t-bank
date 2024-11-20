import { createSlice } from '@reduxjs/toolkit';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';

const { getSpecialties, getIcd, getIcdRoots } = medicalSystemApi.dictionary;

type State = {
    specialties: sharedConfigTypes.Speciality[];
    icdRoots: sharedConfigTypes.Icd[];
    icd: sharedConfigTypes.Icd[];
    isLoading: boolean;
    error: string | null;
};

const initialState: State = {
    specialties: [],
    icdRoots: [],
    icd: [],
    isLoading: false,
    error: null,
};

const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        setIcd(state, action) {
            state.icd = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpecialties.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSpecialties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.specialties = action.payload.specialties;
            })
            .addCase(getSpecialties.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(getIcd.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getIcd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.icd = action.payload.records;
            })
            .addCase(getIcd.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(getIcdRoots.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getIcdRoots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.icdRoots = action.payload;
            })
            .addCase(getIcdRoots.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setIcd } = dictionarySlice.actions;

export const dictionaryReducer = dictionarySlice.reducer;
