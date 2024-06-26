import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, resetOrder } from './actions';

interface OrderState {
  orderNumber: string,
  orderName: string,
  orderStatus: string,
  orderError: any,
}

const initialState: OrderState = {
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
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderStatus = "success";
        state.orderError = null;
        state.orderName = action.payload.name;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.orderStatus = "loading";
        state.orderError = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.error;
      })
  }
})
