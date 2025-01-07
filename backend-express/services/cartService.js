// cartService Business Logic:
// - check in the stock
// - limit the quantity

const cartData = require('../data/cartData');
const geolocationData = require('../services/Geolocation');

/**
 * Fetches all cart contents for a specific user.
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>} - List of cart items with product details
 */
async function getCartContents(userId) {
  const geo = geolocationData.requireGeolocation();

  let cart = await cartData.getCartContents(userId);
  // console.log(cart);

  // idea for business logic:
  // 1. check existing stock level
  // 2. apply changes to price
  // 3. data analysis and give recommendations

  // For region=NY, product_id=3, it is 50% OFF!
  if (geo.region === 'NY') {
    // console.log(geo.region);
    const type_id = 1;
    const product_id = 3;
    // note: item.id -> item.product_id
    const indexToModify = cart.findIndex(item => item.product_id === product_id);
    if (indexToModify !== -1) {
      // console.log(indexToModify);
      // 1. clone the original object
      const clonedObject = {...cart[indexToModify]};
      // console.log(clonedObject);
      // 2. modify the clone
      clonedObject.discount = '0.50';
      // console.log(clonedObject);
      // 3. replace the clone as the new value in the object
      cart[indexToModify] = clonedObject;
      // console.log(cart);
    }
  }

  // For city=New York, product_id=5, it is 25% MARKUP!
  if (geo.city === 'New York') {
    // console.log(geo.city);
    const type_id = 1;
    const product_id = 5;
    // note: item.id -> item.product_id
    const indexToModify = cart.findIndex(item => item.product_id === product_id);
    if (indexToModify !== -1) {
      // console.log(indexToModify);
      // 1. clone the original object
      const clonedObject = {...cart[indexToModify]};
      // console.log(clonedObject);
      // 2. modify the clone
      // note: cart[indexToModify].priceTag -> cart[indexToModify].price
      const markedpriceTag = cart[indexToModify].price * 1.25;
      clonedObject.price = parseFloat(markedpriceTag.toFixed(2));
      // console.log(clonedObject);
      // 3. replace the clone as the new value in the object
      cart[indexToModify] = clonedObject;
      // console.log(cart);
    }
  }

  // return await cartData.getCartContents(userId);
  return cart;
}

/**
 * Updates the cart with a new set of items.
 * This function performs a bulk update, replacing the cart contents with the provided items.
 * @param {number} userId - ID of the user
 * @param {Array} cartItems - Array of items to update in the cart
 */
async function updateCart(userId, cartItems) {
  if (!Array.isArray(cartItems)) {
    throw new Error('Cart items must be an array');  }
  // console.log(userId);
  // console.log(cartItems);
  const result = await cartData.updateCart(userId, cartItems);
  // console.log(result);
}

module.exports = {
  getCartContents,
  updateCart // Only bulk update is needed now
};
