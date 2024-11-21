import { createSlice } from '@reduxjs/toolkit';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';

const { get } = medicalSystemApi.inspection;

type State = {
    prevInspection: string | null;
    curInspection: string | null;
    data: sharedConfigTypes.Inspection | null;
    isLoading: boolean;
};

const initialState: State = {
    prevInspection: null,
    curInspection: null,
    data: null,
    isLoading: false,
};

const inspectionSlice = createSlice({
    name: 'inspection',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        removeData(state) {
            state.data = null;
        },
        removeAll(state) {
            state.prevInspection = null;
            state.curInspection = null;
            state.data = null;
            state.isLoading = false;
        },
        setPrevInspection(state, action) {
            state.prevInspection = action.payload;
        },
        setCurInspection(state, action) {
            state.curInspection = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get.fulfilled, (state, action) => {
                state.curInspection = action.payload.id;
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(get.rejected, (state) => {
                state.isLoading = false;
                state.data = null;
                state.curInspection = null;
            });
    },
});

export const {
    setData,
    removeAll,
    removeData,
    setPrevInspection,
    setCurInspection,
} = inspectionSlice.actions;
export const inspectionReducer = inspectionSlice.reducer;
