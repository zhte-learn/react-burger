import BurgerIngredient from "./ingredient-interface";

export interface IngredientState {
  ingredients: BurgerIngredient[],
  ingredientsRequest: boolean,
  ingredientsRequestFailed: boolean,
}