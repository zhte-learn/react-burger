import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TConfirmOrderResponse } from '../../utils/custom-types';

export const getOrderDetails = createAsyncThunk<TConfirmOrderResponse, string[]>(
  "order/getOrderDetails",
  async(ingredientsIds: string[]) => {
    return await api.makeOrder(ingredientsIds);
  }
);

export const resetOrder = createAsyncThunk<void>(
  "order/resetOrder",
  async() => {
    return;
  }
)
