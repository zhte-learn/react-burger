import { getIngredientsRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsRequest();
      if(response.success) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
