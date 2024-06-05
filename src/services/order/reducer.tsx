// import { 
//   GET_ORDER_DETAILS, 
//   GET_ORDER_DETAILS_SUCCESS, 
//   GET_ORDER_DETAILS_FAILED,
//   RESET_ORDER,
// } from "./actions";

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

/*

export const orderReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        orderLoading: true,
        orderRequestFailed: false,
        errorMessage: "",
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderName: action.payload.name,
        orderNumber: action.payload.order.number,
        orderLoading: false,
        orderRequestFailed: false,
        errorMessage: "",
      }
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequestFailed: true,
        orderLoading: false,
        errorMessage: action.payload,
      }
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderNumber: null,
      }
    }
    default: {
      return state;
    }
  }
}*/