const pool = require('../database');

async function getOrdersByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM aieshop2.orders WHERE user_id = ?', [userId]);
    return rows;
}

async function createOrder(userId, orderItems) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Calculate total order amount
        // const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let current = 0; 
        let reducer = function(sum, item) {
          const price = item.price;
          const discount = item.price * (1 - item.discount);
          if (discount === price) {
            current = item.price * item.quantity;
          } else {
            current = item.price * (1 - item.discount) * item.quantity;
          }
          return current + sum;
        }
        const total = orderItems.reduce(reducer, 0).toFixed(2);
        // console.log(total);

        // Insert order data
        const [orderResult] = await connection.query("INSERT INTO aieshop2.orders (user_id, total) VALUES (?, ?)", [userId, total]);
        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of orderItems) {
            await connection.query(
                'INSERT INTO aieshop2.order_items (order_id, type_id, product_id, quantity) VALUES (?, ?, ?, ?)',
                [orderId, item.type_id, item.product_id, item.quantity]
            );
        }

        await connection.commit();
        return orderId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getOrderDetails(orderId) {
    let rows = [];
    let lhs = [];
    let rhs = [];
    let cat_id = 1;

//     const [cat_id] = await pool.query(
//     'SELECT oi.type_id FROM order_items AS oi JOIN category cat ON oi.type_id = cat.id WHERE oi.order_id = ?',
//     [orderId]
//   );

// const [cat_type] = await pool.query(
//     'SELECT cat.type FROM order_items AS oi JOIN category cat ON oi.type_id = cat.id WHERE oi.order_id = ?',
//     [orderId]
//   );

//   if (cat_rows === "AI-Books") {
//   if (cat_id === 1) {
    cat_id = 1;
    lhs = [...rows];
    [rows] = await pool.query(`
        SELECT
            oi.product_id,
            oi.type_id,
            p.title,
            p.priceTag,
            p.discount,
            oi.quantity
        FROM aieshop2.order_items AS oi
        JOIN aieshop2.aibooks AS p ON oi.product_id = p.id
        WHERE oi.order_id = ? AND oi.type_id = ?
    `, [orderId, cat_id]);

    rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
//   } else if (cat_rows === "AI-Image") {
// } else if (cat_id === 2) {
    cat_id = 2;
    lhs = [...rows];
    [rows] = await pool.query(`
        SELECT
            oi.product_id,
            oi.type_id,
            p.title,
            p.priceTag,
            p.discount,
            oi.quantity
        FROM aieshop2.order_items AS oi
        JOIN aieshop2.aiimage AS p ON oi.product_id = p.id
        WHERE oi.order_id = ? AND oi.type_id = ?
    `, [orderId, cat_id]);

    rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
//   } else if (cat_rows === "AI-Music") {
// } else if (cat_id === 3) {
    cat_id = 3;
    lhs = [...rows];
    [rows] = await pool.query(`
        SELECT
            oi.product_id,
            oi.type_id,
            p.title,
            p.priceTag,
            p.discount,
            oi.quantity
        FROM aieshop2.order_items AS oi
        JOIN aieshop2.aimusic AS p ON oi.product_id = p.id
        WHERE oi.order_id = ? AND oi.type_id = ?
    `, [orderId, cat_id]);

    rhs = [...rows];
        rows = [...lhs, ...rhs];
        // console.log(lhs, rhs, rows);
//   } else if (cat_rows === "AI-Video") {
// } else if (cat_id === 4) {
    cat_id = 4;
    lhs = [...rows];
    [rows] = await pool.query(`
        SELECT
            oi.product_id,
            oi.type_id,
            p.title,
            p.priceTag,
            p.discount,
            oi.quantity
        FROM aieshop2.order_items AS oi
        JOIN aieshop2.aivideo AS p ON oi.product_id = p.id
        WHERE oi.order_id = ? AND oi.type_id = ?
    `, [orderId, cat_id]);
    rhs = [...rows];
    rows = [...lhs, ...rhs];
    console.log("order");
    console.log(rows);
//   }
  
    return rows;
}

async function updateOrderStatus(orderId, status) {
    // validate status before updating
    if (!['created', 'processing', 'completed', 'cancelled'].includes(status)) {
        throw new Error('Invalid status');
    }
    await pool.query('UPDATE aieshop2.orders SET status = ? WHERE id = ?', [status, orderId]);
}

async function updateOrderSessionId(orderId, sessionId) {
    await pool.query('UPDATE aieshop2.orders SET checkout_session_id = ? WHERE id = ?', [sessionId, orderId]);
}

module.exports = {
    getOrdersByUserId,
    createOrder,
    getOrderDetails,
    updateOrderStatus,
    updateOrderSessionId
};
