import{
  HANDLE_NAME,
  HANDLE_PRICE,
  HANDLE_QUANTITY,
  CLEAN_INPUT,
  GET_DATA
} from './types';

export const handleChangeName = (name) => dispatch => (
  dispatch({
    type: HANDLE_NAME,
    payload: name  
  })
)

export const handleChangePrice = (price) => dispatch => (
  dispatch({
    type: HANDLE_PRICE,
    payload: price
  })
)

export const handleChangeQuantity = (quantity) => dispatch => (
  dispatch({
    type: HANDLE_QUANTITY,
    payload: quantity
  })
)

export const cleanInputs = () => ({
  type: CLEAN_INPUT
})

export const getData = (id) => dispatch => {
  dispatch({
    type: GET_DATA,
    payload: id
  })
}
