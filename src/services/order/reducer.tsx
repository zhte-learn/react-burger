import { 
  GET_ORDER_DETAILS, 
  GET_ORDER_DETAILS_SUCCESS, 
  GET_ORDER_DETAILS_FAILED,
  RESET_ORDER,
} from "./actions";

const initialState = {
  orderNumber: null,
  orderName: "",
  orderLoading: false,
  orderRequestFailed: false,
  orderErrorMessage: "",
}

export const orderReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        orderLoading: true,
        orderRequestFailed: false,
        errorMessage: "",
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderName: action.payload.name,
        orderNumber: action.payload.order.number,
        orderLoading: false,
        orderRequestFailed: false,
        errorMessage: "",
      }
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequestFailed: true,
        orderLoading: false,
        errorMessage: action.payload,
      }
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderNumber: null,
      }
    }
    default: {
      return state;
    }
  }
}