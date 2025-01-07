// productService Business Logic:
// - certain product are not for sale in any country
// - products could be priced differently in different region
// - increase product's pricing base on user's surfing behaviour

const productData = require('../data/productData');
const geolocationData = require('../services/Geolocation');

// async function getAllProducts(geo) {
  async function getAllProducts() {
    // idea for future business logic:
    // 1. may have to pass parameter to getAllProducts to filter by country
    // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
    let product = await productData.getAllProducts();
    // console.log(product);
  
    const geo = geolocationData.requireGeolocation();
  
    // For country=US, product_id=4, it is NOT FOR SALE!
    if (geo.country === 'US') {
      const type_id = 1;
      const product_id = 4;
      const indexToDelete = product.findIndex(item => item.id === product_id);
      if (indexToDelete !== -1) {
        const lhs = product.slice(0, indexToDelete);
        const rhs = product.slice(indexToDelete + 1)
        const cloned = [...lhs, ...rhs];
        product = cloned;
        // shortcut code:
        // product = product.filter( item => item.id !== product_id)
      }
    }
  
    // For region=NY, product_id=3, it is 50% OFF!
    if (geo.region === 'NY') {
      // console.log(geo.region);
      const type_id = 1;
      const product_id = 3;
      // note: item.product_id -> item.id
      const indexToModify = product.findIndex(item => item.id === product_id);
      if (indexToModify !== -1) {
        // console.log(indexToModify);
        // 1. clone the original object
        const clonedObject = {...product[indexToModify]};
        // console.log(clonedObject);
        // 2. modify the clone
        clonedObject.discount = '0.50';
        // console.log(clonedObject);
        // 3. replace the clone as the new value in the object
        product[indexToModify] = clonedObject;
        // console.log(product);
      }
    }
  
    // For city=New York, product_id=5, it is 25% MARKUP!
    if (geo.city === 'New York') {
      // console.log(geo.city);
      const type_id = 1;
      const product_id = 5;
      // note: item.product_id -> item.id
      const indexToModify = product.findIndex(item => item.id === product_id);
      if (indexToModify !== -1) {
        // console.log(indexToModify);
        // 1. clone the original object
        const clonedObject = {...product[indexToModify]};
        // console.log(clonedObject);
        // 2. modify the clone
        // note: product[indexToModify].price -> product[indexToModify].priceTag
        const markedpriceTag = product[indexToModify].priceTag * 1.25;
        clonedObject.priceTag = parseFloat(markedpriceTag.toFixed(2));
        // console.log(clonedObject);
        // 3. replace the clone as the new value in the object
        product[indexToModify] = clonedObject;
        // console.log(product);
      }
    }
  
    // console.log(product);
    // return await productData.getAllProductsBooks();
    return product;
  }

// async function getAllProductsBooks(geo) {
async function getAllProductsBooks() {
  // idea for future business logic:
  // 1. may have to pass parameter to getAllProducts to filter by country
  // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
  let product = await productData.getAllProductsBooks();
  // console.log(product);

  const geo = geolocationData.requireGeolocation();

  // For country=US, product_id=4, it is NOT FOR SALE!
  if (geo.country === 'US') {
    const type_id = 1;
    const product_id = 4;
    const indexToDelete = product.findIndex(item => item.id === product_id);
    if (indexToDelete !== -1) {
      const lhs = product.slice(0, indexToDelete);
      const rhs = product.slice(indexToDelete + 1)
      const cloned = [...lhs, ...rhs];
      product = cloned;
      // shortcut code:
      // product = product.filter( item => item.id !== product_id)
    }
  }

  // For region=NY, product_id=3, it is 50% OFF!
  if (geo.region === 'NY') {
    // console.log(geo.region);
    const type_id = 1;
    const product_id = 3;
    // note: item.product_id -> item.id
    const indexToModify = product.findIndex(item => item.id === product_id);
    if (indexToModify !== -1) {
      // console.log(indexToModify);
      // 1. clone the original object
      const clonedObject = {...product[indexToModify]};
      // console.log(clonedObject);
      // 2. modify the clone
      clonedObject.discount = '0.50';
      // console.log(clonedObject);
      // 3. replace the clone as the new value in the object
      product[indexToModify] = clonedObject;
      // console.log(product);
    }
  }

  // For city=New York, product_id=5, it is 25% MARKUP!
  if (geo.city === 'New York') {
    // console.log(geo.city);
    const type_id = 1;
    const product_id = 5;
    // note: item.product_id -> item.id
    const indexToModify = product.findIndex(item => item.id === product_id);
    if (indexToModify !== -1) {
      // console.log(indexToModify);
      // 1. clone the original object
      const clonedObject = {...product[indexToModify]};
      // console.log(clonedObject);
      // 2. modify the clone
      // note: product[indexToModify].price -> product[indexToModify].priceTag
      const markedpriceTag = product[indexToModify].priceTag * 1.25;
      clonedObject.priceTag = parseFloat(markedpriceTag.toFixed(2));
      // console.log(clonedObject);
      // 3. replace the clone as the new value in the object
      product[indexToModify] = clonedObject;
      // console.log(product);
    }
  }

  // console.log(product);
  // return await productData.getAllProductsBooks();
  return product;
}

async function getAllProductsImage() {
  // idea for future business logic:
  // 1. may have to pass parameter to getAllProducts to filter by country
  // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
  let product = await productData.getAllProductsImage();
  // console.log(product);
  // return await productData.getAllProductsImage();
  return product;
}

async function getAllProductsMusic() {
  // idea for future business logic:
  // 1. may have to pass parameter to getAllProducts to filter by country
  // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
  let product = await productData.getAllProductsMusic();
  // console.log(product);
  // return await productData.getAllProductsMusic();
  return product;
}

async function getAllProductsVideo() {
  // idea for future business logic:
  // 1. may have to pass parameter to getAllProducts to filter by country
  // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
  let product = await productData.getAllProductsVideo();
  // console.log(product);
  // return await productData.getAllProductsVideo();
  return product;
}

async function getProductById(id) {
  const product = await productData.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

async function createProductByBody(type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const product = await productData.createProductByBody(type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
  if (!product) {
    throw new Error('Product not created');
  }
  // todo: check for promotion, special business logic (region blocking) etc.
  return product;
}

async function updateProductByIdBody(id, type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const product = await productData.updateProductByIdBody(id, type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
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
  getAllProductsBooks,
  getAllProductsImage,
  getAllProductsMusic,
  getAllProductsVideo,
  getProductById,
  createProductByBody,
  updateProductByIdBody,
  deleteProductById
};
