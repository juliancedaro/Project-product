const baseUrl = 'http://localhost:9000'

const getConfig = () => ({
  headers: {
    'Content-Type': 'application/json'
  }
})

export const get = (url) => 
  fetch( `${baseUrl}${url}`, 
  {method: 'GET'})
.then(response => response.json())

export const post = (url, body) => 
  fetch( `${baseUrl}${url}`, { 
    method: 'POST', 
    ...getConfig(),
    body: JSON.stringify(body), 
  }
).then(response => response.json())

export const put = (url, body) => 
  fetch( `${baseUrl}${url}`, {
    method: 'PUT',
    ...getConfig(),
    body: JSON.stringify(body)
  }
).then(response => response.json())

export const deleteItem = (url) => 
  fetch( `${baseUrl}${url}`, {
    method: 'DELETE',
   ...getConfig()
  }
).then(response => response.json())







// export const getProducts = () => {
//   return (fetch('http://localhost:9000/products/', {
//     method: 'GET',
//     headers:{
//       'Content-Type': 'application/json'
//     }
//   })
// )}
// export const addProduct = (name,price,quantity) => {
//   // console.log('name', name)
//   // console.log('price', price)
//   // console.log('quantity', quantity)
//   return fetch('http://localhost:9000/products/add', {
//     method: 'POST',
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "name": name,
//       "price": price,
//       "quantity": quantity
//     })
//   })
// }
// export const updateProduct = (id, name, price, quantity) => {
//   return fetch(`http://localhost:9000/products/update/${id}`, {
//     method: 'PUT',
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "name": name,
//       "price": price,
//       "quantity": quantity
//     })
//   })
// }
// export const deleteProduct = (id) => {
//   return fetch(`http://localhost:9000/products/delete/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'Application/json'
//     }
//   })
// }

