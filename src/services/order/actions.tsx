import { Dispatch } from 'redux';
import { getOrder } from '../../utils/api';

export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const RESET_ORDER = 'RESET_ORDER' 

export function getOrderDetails(ingredientsIds: string[]) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: GET_ORDER_DETAILS,
    })

    getOrder(ingredientsIds)
    .then(res => {
      if(res && res.success) {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          payload: res,
        })
      } else {
        dispatch({
          type: GET_ORDER_DETAILS_FAILED,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ORDER_DETAILS_FAILED,
        payload: `Код ошибки:${error.message}`,
      })
    })
  }
}

export function resetOrder() {
  return function(dispatch: Dispatch) {
    dispatch({
      type: RESET_ORDER,
    })
  }
}