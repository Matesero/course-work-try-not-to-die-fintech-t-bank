import { createSlice } from '@reduxjs/toolkit';

import { get } from '~/shared/api/medicalSystem/inspection';
import { sharedConfigTypes } from '~/shared/config';

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
