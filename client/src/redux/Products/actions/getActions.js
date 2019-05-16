import { 
  FETCH_GET_PENDING, 
  FETCH_GET_FULLFILLED, 
  FETCH_GET_REJECTED 
} from './types';

import { getProducts as getProductsAPI } from '../../../api/index';

export const getProducts = () => dispatch => {
  dispatch(getProductsPending())
  getProductsAPI()
    .then(response => response.json())
    .then(jsonResponse => dispatch(getProductsSuccess(jsonResponse)))
    .catch(error => {
      dispatch(getProductsRejected(error))
    })
};

export const getProductsSuccess = (jsonResponse) => ({
  type: FETCH_GET_FULLFILLED,
  payload: jsonResponse
})

export const getProductsPending = () => ({
  type: FETCH_GET_PENDING,
})

export const getProductsRejected = (error) => ({
  type: FETCH_GET_REJECTED,
  error
})