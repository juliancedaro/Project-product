const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const productRoutes = require('./routes/products');


//conection
// const Sequelize  = require('sequelize');

// const sequelize = new Sequelize('julian','julian','',{
//   host:'localhost',
//   dialect:'postgres'
// });

// sequelize.authenticate()
// .then(()=>{
//   console.log('estas conectado');
// })
// .catch(err => {
//   console.log(err);
// })


//settings
app.set('json spaces', 4);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//routes

app.use('/products', productRoutes);

//static files



//Start Server
app.listen(9000, () => {
    console.log('Server on port 9000',9000);
});