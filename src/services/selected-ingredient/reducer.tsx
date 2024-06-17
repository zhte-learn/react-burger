import { createSlice } from "@reduxjs/toolkit";
import { selectIngredient } from "./actions";
import BurgerIngredient from "../../utils/ingredient-interface";

interface SelectedIngredientState {
  selectedIngredient: BurgerIngredient | null; 
}

const initialState: SelectedIngredientState = {
  selectedIngredient: null,
}

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectIngredient.fulfilled, (state, action) => {
        state.selectedIngredient = action.payload;
      })
  }
})
