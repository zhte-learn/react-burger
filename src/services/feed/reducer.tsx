import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from '../../utils/custom-types';

export type TFeedState = {
  status: string,
  orders: TOrder[];
  total: string;
  totalToday: string;
  connectionError: string | null,
}

const initialState: TFeedState = {
  status: "connecting",
  orders: [],
  total: "",
  totalToday: "",
  connectionError: null,
}

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsOpen: (state: TFeedState) => {
      state.status = "online",
      state.connectionError = null;
    },
    wsClose: (state: TFeedState) => {
        state.status = "offline";
    },
    wsError: (state: TFeedState, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state: TFeedState, action: any) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  // selectors: {
  //   getOrders: state => state.orders,
  // }
})

export const { wsOpen, wsClose, wsError, wsMessage } = feedSlice.actions;
// export const { getOrders } = feedSlice.selectors;
export type TWsInternalActions = ReturnType<typeof feedSlice.actions[keyof typeof feedSlice.actions]>;
