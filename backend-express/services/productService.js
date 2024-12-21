const productData = require('../data/productData');

async function getAllProducts() {
  return await productData.getAllProducts();
}

async function getProductById(id) {
  const product = await productData.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

async function createProductByBody(isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const product = await productData.createProductByBody(isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
  if (!product) {
    throw new Error('Product not created');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

async function updateProductByIdBody(id, isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const product = await productData.updateProductByIdBody(id, isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
  if (!product) {
    throw new Error('Product not found');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

async function deleteProductById(id) {
  const product = await productData.deleteProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProductByBody,
  updateProductByIdBody,
  deleteProductById
};
