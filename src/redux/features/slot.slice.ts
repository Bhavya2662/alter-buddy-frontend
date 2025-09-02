import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface SliceSliceProps {
  selectDate: any;
  slots: string[];
  selectTime: string;
  warning: string | null;
}

const initialState: SliceSliceProps = {
  selectDate: "",
  slots: [],
  selectTime: "",
  warning: null,
};

const SlotSlice = createSlice({
  initialState,
  name: "slot",
  reducers: {
    handleSelectedDate: (state, action) => {
      state.selectDate = action.payload;
    },
    resetSelectedDate: (state) => {
      state.selectDate = "";
    },
    handleSelectTime: (state, action: PayloadAction<string>) => {
      if (!state.selectDate) {
        state.warning = "please select date first";
      }
      if (state.selectDate) {
        state.warning = "";
        state.selectTime = action.payload;
      }
    },
    createTimeSlot: (state, action: PayloadAction<string>) => {
      state.slots.push(action.payload.toString());
      state.selectTime = "";
    },
    resetSlotSlice: () => initialState,
  },
});

export const useSliceSlice = () =>
  useSelector((state: RootState) => {
    return state.slot;
  });
export const SlotReducer = SlotSlice.reducer;
export const {
  handleSelectedDate,
  resetSelectedDate,
  handleSelectTime,
  createTimeSlot,
  resetSlotSlice,
} = SlotSlice.actions;
