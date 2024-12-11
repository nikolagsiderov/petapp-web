import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "bg",
};

export const bgLocalizationReducer = createSlice({
  name: "bgLocalization",
  initialState,
  reducers: {
    unset: (state) => {
      state.value = "bg";
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { unset, set } = bgLocalizationReducer.actions;

export default bgLocalizationReducer.reducer;
