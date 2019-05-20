import { get, post, put, deleteItem } from '../../../api/index';

export const getProducts = () => {
   return get('/products/');
}

export const addProduct = (name,price,quantity) => {
  return post('/products/add',
    {
      "name": name,
      "price": price,
      "quantity": quantity
    }
  )
}

export const updateProduct = (id, name, price, quantity) => {
  return put(`/products/update/${id}`, 
    {
      "name": name,
      "price": price,
      "quantity": quantity
    }
  )
}

export const deleteProduct = (id) => {
  return deleteItem(`/products/delete/${id}`)
}

