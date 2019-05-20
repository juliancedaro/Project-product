import { 
  FETCH_GET_PENDING, 
  FETCH_GET_FULLFILLED, 
  FETCH_GET_REJECTED 
} from './types';

import { getProducts as getProductsAPI } from '../api/index';

export const getProducts = () => dispatch => {
  dispatch(getProductsPending())
  getProductsAPI()
    .then(response => dispatch(getProductsSuccess(response)))
    // .catch(error => {
    //   dispatch(getProductsRejected(error))
    // })
};

export const getProductsSuccess = (products) => ({
  type: FETCH_GET_FULLFILLED,
  payload: products
})

export const getProductsPending = () => ({
  type: FETCH_GET_PENDING,
})

export const getProductsRejected = (error) => ({
  type: FETCH_GET_REJECTED,
  error
})