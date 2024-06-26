import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async(ingredientsIds: string[]) => {
    return await api.getOrder(ingredientsIds);
  }
);

export const resetOrder = createAsyncThunk(
  "order/resetOrder",
  async() => {
    return;
  }
)
