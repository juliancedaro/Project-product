const Sequelize = require('sequelize');

const sequelize = new Sequelize('julian','julian','',{
  host:'localhost',
  dialect:'postgres'
});

sequelize.authenticate()
.then(()=>{
  console.log('estas conectado');
})
.catch(err => {
  console.log(err);
})

const Products = sequelize.define('Products', {
  id: {
    type: Sequelize.SMALLINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  quantity: Sequelize.SMALLINT
}, 
{
  timestamps: false,
});

const getProductsFromDB = () => Products.findAll({ attributes: ['id','name','price', 'quantity']})
  .then(products => {
    if(products){
      return products;
      }
    throw "Impossible to get data"
    });

const addProductstoDB = (name, price, quantity) => {
  return Products.create({
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity)
  }).then(product => {
    if(product){
      return product;
    }
    throw "Impossible to add a new product"
  })
};

const updateProductsfromDB = (id, name, price, quantity) => 
  Products.findByPk(Number(id))
  .then(response => {
    if(response) {
      return response.update({
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      })
    }
  throw "Impossible to patch the product"
});

const deleteProductDB = (idDELETE) => Products.destroy({
  where: {
    id: Number(idDELETE)
  }
})      


const patchProductDB = (idPATCH, newData) => Products.findByPk(Number(idPATCH))
.then(response => {
  if(response) {
    return response.update(newData);
  }
  throw "Impossible to patch the product"
});
    
module.exports = { 
  sequelize, 
  Products, 
  getProductsFromDB, 
  addProductstoDB, 
  deleteProductDB, 
  updateProductsfromDB, 
  patchProductDB};