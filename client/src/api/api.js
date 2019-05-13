export const getProducts = () => {
  return (fetch('http://localhost:9000/products', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  })
)}

export const addProduct = (name,price,quantity) => {
  return fetch('http://localhost:9000/products/', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "price": price,
        "quantity": quantity
      })
    })
}

export const updateProduct = (id, name, price, quantity) => {
  return fetch(`http://localhost:9000/products/${id}`, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "price": price,
      "quantity": quantity
    })
  })
}

export const deleteProduct = (id, name, price, quantity) => {
  return fetch(`http://localhost:9000/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'Application/json'
      }
    })
}

