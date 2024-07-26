import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { placeOrder } from './actions';

type TOrderState = {
  orderNumber: string;
  orderName: string;
  orderStatus: string;
  orderError: any;
}

const initialState: TOrderState = {
  orderNumber: "",
  orderName: "",
  orderStatus: "idle",
  orderError: null,
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state: TOrderState, action: PayloadAction<{name: string, order: {number: string}}>) => {
        state.orderStatus = "success";
        state.orderError = null;
        state.orderName = action.payload.name;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(placeOrder.pending, (state: TOrderState) => {
        state.orderStatus = "loading";
        state.orderError = null;
      })
      .addCase(placeOrder.rejected, (state: TOrderState, action) => {
        state.orderStatus = "failed";
        state.orderError = action.error as SerializedError;
      })
  }
})
