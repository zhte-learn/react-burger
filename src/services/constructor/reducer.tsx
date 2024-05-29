import BurgerIngredient from '../../utils/ingredient-interface';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from './actions';

const initialState = {
  bun: null,
  fillings: []
}

const removeElementById = (array: BurgerIngredient[], id: string) => {
  const idx = array.findIndex((element: BurgerIngredient) => element._id === id);
  if (idx !== -1) {
    return [...array.slice(0, idx), ...array.slice(idx + 1)];
  }
  return array;
}

export const constructorReducer= (state = initialState, action: any) => {
  switch(action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        fillings: [...state.fillings, action.payload]
    }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        fillings: removeElementById(state.fillings, action.payload)
      }
    }
    default: {
      return state;
    }
  }
}