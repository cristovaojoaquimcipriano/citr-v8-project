import { createSlice } from "@reduxjs/toolkit";

export const searchParamsSlice = createSlice({
    name: "searchParams",
    initialState: {
        location: "",
        breed: "",
        animal: ""
    },
    reducers:{
        all: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {all} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
