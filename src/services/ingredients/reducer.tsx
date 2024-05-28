import { IngredientState } from '../../utils/ingredient-state';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
} from './actions'

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsRequestFailed: false,
} as IngredientState;

export const ingredientsReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredientsRequestFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_REQUEST_FAILED: {
      return {
        ...state,
        ingredientsRequestFailed: true,
        ingredientsRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}