import { api } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TBurgerIngredient, TIngredientsResponse } from '../../utils/custom-types';

export const getIngredients = createAsyncThunk<TIngredientsResponse, void>(
  "ingredients/getIngredients",
  async() => {
    return await api.getIngredients();
  }
);
