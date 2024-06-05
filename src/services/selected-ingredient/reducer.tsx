//import { SELECT_INGREDIENT } from "./actions";
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


// export const selectedIngredientReducer= (state = initialState, action: any) => {
//   switch(action.type) {
//     case SELECT_INGREDIENT: {
//       return {
//         ...state,
//         selectedIngredient: action.payload,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }