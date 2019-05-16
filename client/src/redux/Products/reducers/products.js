 import { 
   FETCH_GET_FULLFILLED,
   FETCH_GET_REJECTED,
   FETCH_GET_PENDING,
   FETCH_POST_FULLFILED,
   FETCH_POST_REJECTED,
   FETCH_POST_PENDING,
   FETCH_UPDATE_FULLFILED,
   FETCH_UPDATE_PENDING,
   FETCH_UPDATE_REJECTED,
   FETCH_DELETE_FULLFILED,
   FETCH_DELETE_PENDING,
   FETCH_DELETE_REJECTED,
   HANDLE_NAME,
   HANDLE_PRICE,
   HANDLE_QUANTITY,
   GET_DATA,
   CLEAN_INPUT,
  }
  from '../actions/types';

 const initialState = {
   error: undefined,
   id: '',
   name: '',
   price: '',
   quantity: '',
   isFetching: false,
   products:[] 
 }

 export default (state = initialState, action) =>  {
  switch (action.type) {
    case FETCH_GET_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_GET_FULLFILLED:
    // console.log(action.payload)
      return {
        ...state,
        products: action.payload.products,
        isFetching: false
      };
    case FETCH_GET_REJECTED: 
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case FETCH_POST_PENDING:
      return{
        ...state,
        isFetching: true
      };
    case FETCH_POST_FULLFILED:
      //  console.log(action.payload)
      const products = [
        ...state.products,
        action.payload
      ]
      return{
        ...state,
        products,
        isFetching: false
      }
    case FETCH_POST_REJECTED: 
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case FETCH_UPDATE_FULLFILED:
      return {
        ...state,
        isFetching: false,
        products: state.products.map((item) => {
          if(item.id === action.payload.id) {
            return{
              ...item,
              ...action.payload,
            }
          }
          return item
        })
      }
    case FETCH_UPDATE_PENDING:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_UPDATE_REJECTED:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case FETCH_DELETE_FULLFILED:
      return {
        ...state,
        isFetching: false,
        products: state.products.filter((item) => (item.id.toString() !== action.payload)),
      }
    case FETCH_DELETE_PENDING:
      return{
        ...state,
        isFetching:true
      }
    case FETCH_DELETE_REJECTED:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    case HANDLE_NAME:
      return {
        ...state,
        name: action.payload
      };
    case HANDLE_PRICE:
      return {
        ...state,
        price: action.payload
      }
    case HANDLE_QUANTITY:
      return {
        ...state,
        quantity: action.payload
      }  
    case GET_DATA:
    const product = state.products.find(product => 
      product.id === action.payload
    )
      return {
        ...state,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    case CLEAN_INPUT:
      return {
        ...state,
        id: '',
        name: '',
        price: '',
        quantity: ''
      }
    default: 
      return state;
  }
 }