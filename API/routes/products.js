const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  patchProducts
} = require('../controllers/products');

router.route('/')
.get(getProducts)
.post(addProducts);

// router.route('/add').post(addProducts);

router.route('/:id')
.put(updateProducts)
.delete(deleteProducts)
.patch(patchProducts);

module.exports = router; 
