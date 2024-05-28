import { SELECT_INGREDIENT } from "./actions";

const initialState = {
  selectedIngredient: null,
}

export const selectedIngredientReducer= (state = initialState, action: any) => {
  switch(action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}