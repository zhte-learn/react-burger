import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
} from './actions'

const initialState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsRequestFailed: false,
  errorMessage: "",
};

export const ingredientsReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsLoading: true,
        ingredientsRequestFailed: false,
        errorMessage: "",
      };
    }
    case GET_INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: false,
        ingredientsRequestFailed: false,
        errorMessage: "",
      }
    }
    case GET_INGREDIENTS_REQUEST_FAILED: {
      return {
        ...state,
        ingredientsRequestFailed: true,
        ingredientsLoading: false,
        errorMessage: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}