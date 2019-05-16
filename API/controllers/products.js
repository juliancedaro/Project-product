const { 
  getProductsFromDB, 
  addProductstoDB,
  deleteProductDB, 
  updateProductsfromDB,
  patchProductDB } = require('../Connection/Conection');

module.exports = {
  getProducts: (req, resp) => {
    getProductsFromDB()
      .then(products => {
        return resp
          .status(200)
          .json({
            statusCode: 200,
            products,
          });
      })
      .catch(error => {
        return resp
          .status(404)
          .json({
            code: 404,
            error,
          })
      });
  },
  addProducts: (req,resp) => {
    const { name, price, quantity } = req.body;
    addProductstoDB(name, price, quantity)
    .then(product => {
      console.log('NEW PRODUCT', product);
      return resp
        .status(200)
        .json({
          code: 200,
          product,
        });
    }).catch(error => {
      return resp
        .status(404)
        .json({
          code: 404,
          error,
        })
    })
  },
  updateProducts: (req,resp) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    updateProductsfromDB(id,name,price,quantity)
      .then((response) => {
        if(response){
          return resp
            .status(200)
            .json({
              code: 200,
              response,
            });
        }
        return resp
          .status(404)
          .json({
            code:404,
            error: 'No existe',
          })
    }).catch(error => {
        return resp
        .status(404)
        .json({
          code:404,
          error,
        })
      })    
  },
  deleteProducts: (req, resp) => {
     const { id } = req.params;
     deleteProductDB(id)
      .then((res) => {
        if(res > 0){
          return resp.json({
            code: 200,
            productId: req.params.id,
          })
        }
        return resp
          .status(404)
          .json({ 
            statusCode: 404,
            error: 'The product you wanna delete does not exist',
          })
    })
    .catch(error => {
      return resp
        .status(404)
        .json({ 
          statusCode: 404,
          error: error,
        })
    });
  },
  patchProducts: (req, resp) => {
    const { id } = req.params;
    // const { price } = req.body;
    patchProductDB(id, req.body)
    .then(product => {
      return resp
        .status(200)
        .json({
          code: 200,
          product,
        })
    })
    .catch(error => {
      return resp
        .status(404)
        .json({
          code:404,
          error,
        })
    })
  }
}