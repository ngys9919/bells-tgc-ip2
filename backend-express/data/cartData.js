const pool = require('../database');

// Fetch cart contents for a user
async function getCartContents(userId) {
  
  let rows = [];
  let lhs = [];
  let rhs = [];
  let cat_id = 1;

  // const [cat_id] = await pool.query(
  //   'SELECT c.type_id FROM cart_items c JOIN category cat ON c.type_id = cat.id WHERE c.user_id = ?',
  //   [userId]
  // );

  // const [cat_type] = await pool.query(
  //     'SELECT cat.type FROM cart_items c JOIN category cat ON c.type_id = cat.id WHERE c.user_id = ?',
  //     [userId]
  //   );

  // const [cartlist] = await pool.query(
  //   'SELECT * FROM cart_items c WHERE c.user_id = ?',
  //   [userId]
  // );

  // Retrieve items for each cat_id in the cart
    // if (cat_id === 1) {
      // if (cat_type === "AI-Books") {
      cat_id = 1;
        lhs = [...rows];
        // console.log(lhs);
        [rows] = await pool.query(
          'SELECT c.id, c.type_id, c.product_id, p.id AS pdt_id, p.image as imageUrl, p.title AS productName, CAST(p.priceTag AS DOUBLE) AS price, p.discount, c.quantity FROM cart_items c JOIN aiproducts ai ON c.product_id = ai.id JOIN aibooks p ON ai.productID = p.id WHERE c.user_id = ? AND c.type_id = ?',
          [userId, cat_id]
        );
        // console.log(rows);
        rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
      // } else if (cat_type === "AI-Image") {
      // }
      
      // if (cat_id === 2) {
      cat_id = 2;
        lhs = [...rows];
        // console.log(lhs);
        [rows] = await pool.query(
          'SELECT c.id, c.type_id, c.product_id, p.id AS pdt_id, p.image as imageUrl, p.title AS productName, CAST(p.priceTag AS DOUBLE) AS price, p.discount, c.quantity FROM cart_items c JOIN aiproducts ai ON c.product_id = ai.id JOIN aiimage p ON ai.productID = p.id WHERE c.user_id = ? AND c.type_id = ?',
          [userId, cat_id]
        );
        // console.log(rows);
        rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
      // } else if (cat_type === "AI-Music") {
      // }
      
      // if (cat_id === 3) {
      cat_id = 3;
        lhs = [...rows];
        // console.log(lhs);
        [rows] = await pool.query(
          'SELECT c.id, c.type_id, c.product_id, p.id AS pdt_id, p.image as imageUrl, p.title AS productName, CAST(p.priceTag AS DOUBLE) AS price, p.discount, c.quantity FROM cart_items c JOIN aiproducts ai ON c.product_id = ai.id JOIN aimusic p ON ai.productID = p.id WHERE c.user_id = ? AND c.type_id = ?',
          [userId, cat_id]
        );
        // console.log(rows);
        rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
      // } else if (cat_type === "AI-Video") {
      // }
      
      // if (cat_id === 4) {
      cat_id = 4;
        lhs = [...rows];
        // console.log(lhs);
        [rows] = await pool.query(
          'SELECT c.id, c.type_id, c.product_id, p.id AS pdt_id, p.image as imageUrl, p.title AS productName, CAST(p.priceTag AS DOUBLE) AS price, p.discount, c.quantity FROM cart_items c JOIN aiproducts ai ON c.product_id = ai.id JOIN aivideo p ON ai.productID = p.id WHERE c.user_id = ? AND c.type_id = ?',
          [userId, cat_id]
        );
        // console.log(rows);
        rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log("cart");
        // console.log(rows);
      // }   
  // }

  return rows;
}



// Bulk update the cart contents
async function updateCart(userId, cartItems) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Clear existing cart items for the user
    await connection.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

    // console.log(cartItems);

    // Insert each item in the new cart
    for (const item of cartItems) {
      console.log(item);
      const result = await connection.query(
        'INSERT INTO cart_items (user_id, type_id, product_id, quantity) VALUES (?, ?, ?, ?)',
        [userId, item.type_id, item.product_id, item.quantity]
      );
      // console.log(result);
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
