const pool = require('../database');

// Fetch cart contents for a user
async function getCartContents(userId) {
  const [rows] = await pool.query(
    'SELECT c.id, c.product_id, p.image as imageUrl, p.bookTitle AS productName, CAST(priceTag AS DOUBLE) AS price, p.discount, c.quantity FROM cart_items c JOIN books p ON c.product_id = p.id WHERE c.user_id = ?',
    [userId]
  );
  return rows;
}



// Bulk update the cart contents
async function updateCart(userId, cartItems) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Clear existing cart items for the user
    await connection.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

    // Insert each item in the new cart
    for (const item of cartItems) {
      await connection.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, item.product_id, item.quantity]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getCartContents,
  updateCart
};
