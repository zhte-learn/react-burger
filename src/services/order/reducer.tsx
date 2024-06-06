import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, resetOrder } from './actions';

interface OrderState {
  orderNumber: string,
  orderName: string,
  orderRequestFailed: boolean,
  orderLoading: boolean;
  orderError: any;
}

const initialState: OrderState = {
  orderNumber: "",
  orderName: "",
  orderRequestFailed: false,
  orderLoading: false,
  orderError: null,
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderRequestFailed = false;
        state.orderName = action.payload.name;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.orderRequestFailed = true;
        state.orderLoading = false;
        state.orderError = action.payload;
      })
      .addCase(resetOrder.fulfilled, (state) => {
        state.orderNumber = "";
      })
  }
})
