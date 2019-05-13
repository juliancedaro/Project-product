const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  patchProducts
} = require('../controllers/products');

router.route('/').get(getProducts);

router.route('/add').post(addProducts);

router.route('/update/:id').put(updateProducts);

router.route('/delete/:id').delete(deleteProducts);

// .patch(patchProducts);

module.exports = router; 
