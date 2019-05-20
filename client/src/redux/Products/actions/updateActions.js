import {
  FETCH_UPDATE_FULLFILED,
  FETCH_UPDATE_PENDING,
  FETCH_UPDATE_REJECTED
} from './types';

import { updateProduct as updateProductAPI } from '../api/index';
import { cleanInputs } from '../actions/handleActions';

export const updateProduct = (id, name, price, quantity) => dispatch => {
  dispatch(updateProductsPending())
  if(id){
    const r = window.confirm(`Do you want to update this product: ${name}?`);
    if(r){
      updateProductAPI(id, name, price, quantity)
        .then(productResponse => {
          dispatch(updateProductSuccess(productResponse.response))
          dispatch(cleanInputs())
        })
        .catch(error => dispatch(updateProductRejected(error)))
    }else{
      dispatch(cleanInputs());
    }
  }else alert('Impossible to update, ID is needed');
};

export const updateProductSuccess = (product) => ({
  type: FETCH_UPDATE_FULLFILED,
  payload: product,
})

export const updateProductsPending = () => ({
  type: FETCH_UPDATE_PENDING
})

export const updateProductRejected = (error) => ({
  type: FETCH_UPDATE_REJECTED,
  payload: error
})


// updateState({ 
//   products: state.products.map((item) => {
//   if(item.id === jsonResponse.response.id) {
//     return{
//       ...item,
//       ...jsonResponse.response,
//     }
//   }
//   return item
// }) 
// })
// })
