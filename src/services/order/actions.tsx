import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (ingredientsIds: string[], thunkAPI) => {
    try {
        return await api.getOrder(ingredientsIds);
    } catch (error: any) {
        thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetOrder = createAsyncThunk(
  "order/resetOrder",
  async() => {
    return;
  }
)
