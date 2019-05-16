const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const Cors = require('cors');

// app.use((request, response, rest) => {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Origin", "Origin, Content-Type, Accept");
//     next();
// });

//settings
app.set('json spaces', 4);

//middleware
app.use(Cors());
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