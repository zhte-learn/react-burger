import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TOrderResponse } from '../../utils/custom-types';

export const getOrderDetails = createAsyncThunk<TOrderResponse, string[]>(
  "order/getOrderDetails",
  async(ingredientsIds: string[]) => {
    return await api.getOrder(ingredientsIds);
  }
);

export const resetOrder = createAsyncThunk<void>(
  "order/resetOrder",
  async() => {
    return;
  }
)
