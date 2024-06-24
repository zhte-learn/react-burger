import { api } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../../utils/custom-types';

interface TIngredientsResponse {
  success: boolean;
  data: BurgerIngredient[];
}

export const getIngredients = createAsyncThunk<TIngredientsResponse, void>(
  "ingredients/getIngredients",
  async() => {
    return await api.getIngredients();
  }
);
