import { createSlice } from "@reduxjs/toolkit";

interface AlertState {
  alertOpen: boolean;
  alertMessage: string | null;
}

const initialState = {
  alertOpen: false,
  alertMessage: null,
};

const configSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertOpen: (state, action) => {
      state.alertOpen = action.payload.status;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
  },
});

export const { setAlertOpen, setAlertMessage } = configSlice.actions;
export default configSlice.reducer;
export type { AlertState };
