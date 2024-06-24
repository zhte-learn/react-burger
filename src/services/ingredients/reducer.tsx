import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";
import { BurgerIngredient } from '../../utils/custom-types';

interface IngredientsState {
  ingredients: BurgerIngredient[]; 
  status: string;
  error: any;
}

const initialState: IngredientsState = {
  ingredients: [],
  status: 'idle',
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
  }
})
