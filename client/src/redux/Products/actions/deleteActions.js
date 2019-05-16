import {
  FETCH_DELETE_FULLFILED,
  FETCH_DELETE_PENDING,
  FETCH_DELETE_REJECTED
} from '../actions/types';

import { deleteProduct as deleteProductAPI } from '../../../api/index';

export const deleteProduct = (id, name) => dispatch => {
  dispatch(deleteProductPending());
  if(id){
    const r = window.confirm(`Do you want to delete this product ${name}?`);
    if(r){
      deleteProductAPI(id)
        .then(response =>response.json())
        .then(jsonResponse => dispatch (deleteProductSuccess(jsonResponse.productId)))
        .catch(error => {
          dispatch(deleteProductRejected(error))
        })
    }
  }else{
    alert('Impossible to delete, ID is needed');
  }
} 

export const deleteProductSuccess = (product) => ({
  type: FETCH_DELETE_FULLFILED,
  payload: product
})

export const deleteProductPending = () => ({
  type: FETCH_DELETE_PENDING
})

export const deleteProductRejected = (error) => ({
  type: FETCH_DELETE_REJECTED,
  payload: error
})
