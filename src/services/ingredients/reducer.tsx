import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";
import BurgerIngredient from "../../utils/ingredient-interface";

interface IngredientsState {
  ingredients: BurgerIngredient[]; 
  ingredientsLoading: boolean;
  ingredientsRequestFailed: boolean,
  ingredientsError: any;
}

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsRequestFailed: false,
  ingredientsError: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsRequestFailed = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsRequestFailed = true;
        state.ingredientsError = action.payload;
      })
  }
})
