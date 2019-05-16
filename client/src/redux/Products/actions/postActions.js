import {
  FETCH_POST_FULLFILED,
  FETCH_POST_PENDING,
  FETCH_POST_REJECTED
} from './types';

import { addProduct as addProductAPI } from '../../../api/index';

import { cleanInputs } from '../actions/handleActions';

export const addProduct = (name, price, quantity) => dispatch => {
  dispatch(postProductPending())
  if(name || price || quantity){
    const r = window.confirm(`Do you want to update this product: ${name}?`);
    if(r){
      addProductAPI(name, price, quantity)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch(postProductSuccess(jsonResponse))
        dispatch(cleanInputs())
      })
      .catch (error => {
        postProductRejected(error)
      })
    } else{
      dispatch(cleanInputs());
    }
  }else{
    alert('Impossible to add product, all fields except ID are requested');
  } 
};

export const postProductSuccess = (jsonResponse) => ({
  type: FETCH_POST_FULLFILED,
  payload: jsonResponse.product
})

export const postProductPending = () => ({
  type: FETCH_POST_PENDING
})

export const postProductRejected = (error) => ({
  type: FETCH_POST_REJECTED,
  payload: error
})