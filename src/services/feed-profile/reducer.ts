import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from '../../utils/custom-types';

export type TFeedProfileState = {
  status: string,
  orders: TOrder[];
  total: string;
  totalToday: string;
  connectionError: string | null,
}

export const initialState: TFeedProfileState = {
  status: "connecting",
  orders: [],
  total: "",
  totalToday: "",
  connectionError: null,
}

export const feedProfileSlice = createSlice({
  name: "feedProfile",
  initialState,
  reducers: {
    wsOpenAuth: (state: TFeedProfileState) => {
      state.status = "online",
      state.connectionError = null;
    },
    wsCloseAuth: (state: TFeedProfileState) => {
        state.status = "offline";
    },
    wsErrorAuth: (state: TFeedProfileState, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessageAuth: (state: TFeedProfileState, action: any) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  // selectors: {
  //   getOrders: state => state.orders,
  // }
})

export const { wsOpenAuth, wsCloseAuth, wsErrorAuth, wsMessageAuth } = feedProfileSlice.actions;
// export const { getOrders } = feedSlice.selectors;
export type TWsInternalActions = ReturnType<typeof feedProfileSlice.actions[keyof typeof feedProfileSlice.actions]>;
