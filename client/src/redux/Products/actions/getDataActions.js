import {
  GET_DATA
} from './types';


export const getData = (id) => dispatch => {
  dispatch({
    type: GET_DATA,
    payload: id
  })
}