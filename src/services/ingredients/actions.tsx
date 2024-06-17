import { api } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await api.getIngredientsRequest();
    if(response.success) {
      const data = response.data;
      return data;
    } else {
      console.error('Failed to fetch data');
    }
  }
);
