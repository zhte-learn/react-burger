import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TConfirmOrderResponse, TOrderResponse } from '../../utils/custom-types';

type TPlaceOrderRequest = {
  ingredients: string[],
  token: string,
}

export const placeOrder = createAsyncThunk<TConfirmOrderResponse, TPlaceOrderRequest>(
  "order/placeOrder",
  async({ ingredients, token }) => {
    return await api.makeOrder(ingredients, token);
  }
);

export const resetOrder = createAsyncThunk<void>(
  "order/resetOrder",
  async() => {
    return;
  }
)

export const getOrderByNumber = createAsyncThunk<TOrderResponse, string>(
  "order/getOrderByNumber",
  async(orderNumber) => {
    return await api.getOrder(orderNumber);
  }
)
