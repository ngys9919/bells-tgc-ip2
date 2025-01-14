const pool = require('../database');

async function getAllProducts() {
  // const [rows] = await pool.query('SELECT id, type_id, isbn_13, title, pageCount, CAST(priceTag AS DOUBLE) AS priceTag, image, format, promotion, badge, discount, review FROM aibooks');
  // const [rows] = await pool.query(`SELECT ai.id,
  //                                   c.type AS productCodeID,
  //                                   a.id AS productID
  //                                   FROM aiproducts ai
  //                                   JOIN category c ON ai.productCodeID = c.id
  //                                   LEFT JOIN aibooks a ON ai.productCodeID = c.id AND ai.productID = a.id
  //                                   LEFT JOIN aiimage i ON ai.productCodeID = c.id AND ai.productID = i.id
  //                                   LEFT JOIN aimusic m ON ai.productCodeID = c.id AND ai.productID = m.id
  //                                   LEFT JOIN aivideo v ON ai.productCodeID = c.id AND ai.productID = v.id;
  //                                 `);
  const [rows] = await pool.query(`SELECT ai.id,
                                    c.type AS type_id,
                                    ai.productID,
                                    ai.source_table,
                                    COALESCE(a.title, i.title, m.title, v.title) AS title
                                    FROM aiproducts ai
                                    JOIN category c ON ai.productCodeID = c.id
                                    LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
                                    LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
                                    LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
                                    LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id;
                                  `);
  return rows;
}

// GET product by Product Code ID
async function getProductByProductCodeID(id) {
  let rows = [];
  // console.log(id);
  if (id == 0) {
    [rows] = await pool.query(`SELECT ai.id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id;
    `);
    // console.log(rows);
  } else {
    [rows] = await pool.query(`SELECT ai.id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      WHERE ai.productCodeID = ?
    `, [id]);
  }
  
  return rows;
}

// GET product by Product ID
async function getProductByProductID(id) {
  // console.log(id);
  const [rows] = await pool.query(`SELECT ai.id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      WHERE ai.id = ?
    `, [id]);
  
  return rows[0];
}

// GET product data for product table with Server-side sort, Server-side filter
// id, type_id, title, priceTag, promotion, badge, discount
async function getProductByProductData(sortBy, sortOrder, filterAIproducts) {
  let rows = [];
  
  console.log(sortBy); // column.id
  console.log(sortOrder); // asc or desc
  console.log(filterAIproducts); // 0=AI-Products, 1=AI-Books, 2=AI-Image, 3=AI-Music, 4=AI-Video

  if (filterAIproducts == 0) {
    [rows] = await pool.query(`
      SELECT ai.id AS id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title,
      CONCAT('$', COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag)) AS priceTag,
      COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
      COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
      COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
      CASE
        WHEN CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') = 0 THEN ''
        ELSE CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%')
      END AS discountPercentage,
      CONCAT('$', ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2)) AS discountPrice
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      ORDER BY ${sortBy} ${sortOrder};
    `);

    // Obtaining the Results with Nested Tables
    // [rows] = await pool.execute({
    //   'sql': (`
    //   SELECT ai.id,
    //   c.type AS type_id,
    //   ai.productID,
    //   ai.source_table,
    //   COALESCE(a.title, i.title, m.title, v.title) AS title,
    //   COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
    //   COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
    //   COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
    //   COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount
    //   FROM aiproducts ai
    //   JOIN category c ON ai.productCodeID = c.id
    //   LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
    //   LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
    //   LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
    //   LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
    //   ORDER BY ${sortBy} ${sortOrder};
    //   `),
    //   nestTables: true
    // });

    console.log(rows);
  } else {
    [rows] = await pool.query(`
      SELECT ai.id AS id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title,
      CONCAT('$', COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag)) AS priceTag,
      COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
      COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
      COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
      CASE
        WHEN CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') = 0 THEN ''
        ELSE CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%')
      END AS discountPercentage,
      CONCAT('$', ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2)) AS discountPrice
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      WHERE ai.productCodeID = ?
      ORDER BY ${sortBy} ${sortOrder}
    `, [filterAIproducts]);
  }
  
  // Obtaining the Results with Nested Tables
  // [rows] = await pool.execute({
  //   'sql': `
  //   SELECT ai.id,
  //     c.type AS type_id,
  //     ai.productID,
  //     ai.source_table,
  //     COALESCE(a.title, i.title, m.title, v.title) AS title,
  //     COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
  //     COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
  //     COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
  //     COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount
  //     FROM aiproducts ai
  //     JOIN category c ON ai.productCodeID = c.id
  //     LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
  //     LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
  //     LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
  //     LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
  //     WHERE ai.productCodeID = ${filterAIproducts}
  //     ORDER BY ${sortBy} ${sortOrder};
  //   `,
  //   nestTables: true
  // });

  return rows;
}

//Exact Search
// Search by searchBy: https://<server url>/productTitle?searchBy=Jon Tan -> Jon%20%Tan
// Search by searchBy: https://<server url>/productTitle?searchBy=Alex%20CHUA

//End-with Search
// Search by searchBy: https://<server url>/productTitle?searchBy=%nG

//Start-with Search
// Search by searchBy: https://<server url>/productTitle?searchBy=A%

//Contain-with Search
// Search by searchBy: https://<server url>/productTitle?searchBy=%AnDREW%

// id, type_id, title, priceTag, promotion, badge, discount
async function getProductByProductTitle(searchBy, filterAIproducts) {
  let rows = [];
  
  console.log(searchBy); // query string

  console.log(filterAIproducts);

let criteria = null;

if (searchBy) {
    criteria = "'" + searchBy + "'";
}

console.log(criteria);

if (filterAIproducts == 0) {
  if (searchBy) {
    // console.log(searchBy);
    [rows] = await pool.query(`
      SELECT ai.id AS id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title,
      COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
      COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
      COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
      COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      WHERE COALESCE(a.title, i.title, m.title, v.title) LIKE ${criteria};
    `);
   
  }
  // console.log(rows);
} else {
  if (searchBy) {
    // console.log(searchBy);
    [rows] = await pool.query(`
      SELECT ai.id AS id,
      c.type AS type_id,
      ai.productID,
      ai.source_table,
      COALESCE(a.title, i.title, m.title, v.title) AS title,
      COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
      COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
      COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
      COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount
      FROM aiproducts ai
      JOIN category c ON ai.productCodeID = c.id
      LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
      LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
      LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
      LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
      WHERE ai.productCodeID = ? 
      AND COALESCE(a.title, i.title, m.title, v.title) LIKE ${criteria};
    `, [filterAIproducts]);
   
  }
  // console.log(rows);
}
  return rows;
}

// id, type_id, title, priceTag, promotion, badge, discount
async function getProductByProductPrice(searchByMinPrice, searchByMaxPrice, filterAIproducts) {
  let rows = [];
  
  console.log(searchByMinPrice); // minimum price
  console.log(searchByMaxPrice); // maximum price
  console.log(filterAIproducts);

if (filterAIproducts == 0) {
    // console.log(searchByMinPrice);
    // console.log(searchByMaxPrice);
    
    if (((!searchByMinPrice) && (!searchByMaxPrice))) {
      // searchByMinPrice = null; searchByMaxPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id;
      `);
    } else if (!searchByMinPrice) {
      // searchByMinPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) <= ${searchByMaxPrice};
      `);
    } else if (!searchByMaxPrice) {
      // searchByMaxPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) >= ${searchByMinPrice};
      `);
    } else {
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) >= ${searchByMinPrice}
        AND COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) <= ${searchByMaxPrice};
      `);
    }
    
   
  // console.log(rows);
} else {
    // console.log(searchByMinPrice);
    // console.log(searchByMaxPrice);

    if (((!searchByMinPrice) && (!searchByMaxPrice))) {
      // searchByMinPrice = null; searchByMaxPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE ai.productCodeID = ?;
      `, [filterAIproducts]);
    } else if (!searchByMinPrice) {
      // searchByMinPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE ai.productCodeID = ? 
        AND COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) <= ${searchByMaxPrice};
      `, [filterAIproducts]);
    } else if (!searchByMaxPrice) {
      // searchByMaxPrice = null
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE ai.productCodeID = ? 
        AND COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) >= ${searchByMinPrice};
      `, [filterAIproducts]);
    } else{
      [rows] = await pool.query(`
        SELECT ai.id AS id,
        c.type AS type_id,
        ai.productID,
        ai.source_table,
        COALESCE(a.title, i.title, m.title, v.title) AS title,
        COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
        COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotion,
        COALESCE(a.badge, i.badge, m.badge, v.badge) AS badge,
        COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount,
        CONCAT(ROUND(COALESCE(a.discount, i.discount, m.discount, v.discount) * (100), 0),'%') AS discountPercentage,
        ROUND(COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) * (1 - COALESCE(a.discount, i.discount, m.discount, v.discount)), 2) AS finalPrice
        FROM aiproducts ai
        JOIN category c ON ai.productCodeID = c.id
        LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
        LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
        LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
        LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
        WHERE ai.productCodeID = ? 
        AND COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) >= ${searchByMinPrice}
        AND COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) <= ${searchByMaxPrice};
      `, [filterAIproducts]);
    }

  // console.log(rows);
}
  return rows;
}


async function getAllProductsBooks() {
  // const [rows] = await pool.query('SELECT id, type_id, isbn_13, title, pageCount, CAST(priceTag AS DOUBLE) AS priceTag, image, format, promotion, badge, discount, review FROM aibooks');
  const [rows] = await pool.query('SELECT ai.id, p.id AS pdt_id, p.type_id, p.isbn_13, p.title, p.pageCount, CAST(p.priceTag AS DOUBLE) AS priceTag, p.image, p.format, p.promotion, p.badge, p.discount, p.review FROM aiproducts ai JOIN aibooks p ON ai.productID = p.id WHERE ai.productCodeID = 1');
  return rows;
}

async function getAllProductsImage() {
  // const [rows] = await pool.query('SELECT id, type_id, title, description, fileSize, CAST(priceTag AS DOUBLE) AS priceTag, image, dateCreated, promotion, badge, discount, review FROM aiimage');
  const [rows] = await pool.query('SELECT ai.id, p.id AS pdt_id, p.type_id, p.title, p.description, p.fileSize, CAST(p.priceTag AS DOUBLE) AS priceTag, p.image, p.dateCreated, p.promotion, p.badge, p.discount, p.review FROM aiproducts ai JOIN aiimage p ON ai.productID = p.id WHERE ai.productCodeID = 2');
  return rows;
}

async function getAllProductsMusic() {
  // const [rows] = await pool.query('SELECT id, type_id, title, CAST(priceTag AS DOUBLE) AS priceTag, music, image, promotion, badge, discount, review FROM aimusic');
  const [rows] = await pool.query('SELECT ai.id, p.id AS pdt_id, p.type_id, p.title, CAST(p.priceTag AS DOUBLE) AS priceTag, p.music, p.image, p.promotion, p.badge, p.discount, p.review FROM aiproducts ai JOIN aimusic p ON ai.productID = p.id WHERE ai.productCodeID = 3');
  return rows;
}

async function getAllProductsVideo() {
  // const [rows] = await pool.query('SELECT id, type_id, title, CAST(priceTag AS DOUBLE) AS priceTag, video, image, promotion, badge, discount, review FROM aivideo');
  const [rows] = await pool.query('SELECT ai.id, p.id AS pdt_id, p.type_id, p.title, CAST(p.priceTag AS DOUBLE) AS priceTag, p.video, p.image, p.promotion, p.badge, p.discount, p.review FROM aiproducts ai JOIN aivideo p ON ai.productID = p.id WHERE ai.productCodeID = 4');
  return rows;
}

// GET product details
async function getProductById(id) {
  console.log(id);
  const [rows] = await pool.query(`SELECT ai.id,
    c.type AS type_id,
    ai.productID,
    ai.source_table,
    a.isbn_13,
    a.pageCount,
    a.format,
    COALESCE(i.description, m.description, v.description) AS description,
    COALESCE(i.fileSize, m.fileSize, v.fileSize) AS fileSize,
    COALESCE(i.dateCreated, m.dateCreated, v.dateCreated) AS dateCreated,
    COALESCE(a.image, i.image, m.music, v.video) AS productUrl,
    COALESCE(a.image, i.image, m.image, v.image) AS imageUrl,
    COALESCE(a.title, i.title, m.title, v.title) AS productName,
    COALESCE(a.priceTag, i.priceTag, m.priceTag, v.priceTag) AS priceTag,
    COALESCE(a.promotion, i.promotion, m.promotion, v.promotion) AS promotionName,
    COALESCE(a.badge, i.badge, m.badge, v.badge) AS productBadge,
    COALESCE(a.discount, i.discount, m.discount, v.discount) AS discount
    FROM aiproducts ai
    JOIN category c ON ai.productCodeID = c.id
    LEFT JOIN aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
    LEFT JOIN aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
    LEFT JOIN aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
    LEFT JOIN aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id
    WHERE ai.id = ?
  `, [id]);

  console.log(rows[0]);
return rows[0];
}

//GET => Read
// GET a single product
// async function getProductById(id) {
//   const [rows] = await pool.query('SELECT * FROM aibooks WHERE id = ?', [id]);
//   return rows[0];
// }

//POST => Create
// POST a single product
async function createProductByBody(type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (lastName == '') {
      lastName = null;
    }

    let [authors] = await connection.query('SELECT * from authors');

    // console.log(firstName);
    // console.log(lastName);

    let newAuthor = false;
    let newAuthorId = null;
    for (let a of authors) {
      // console.log(a);
      if ((a.firstName !== firstName) && (firstName != null)) {
        if (a.lastName !== lastName) {
          newAuthor = true;
        }
      } else {
        newAuthor = false;
        newAuthorId = a.author_id;
        break;
      }
    }

    // console.log(newAuthor);
    // console.log(newAuthorId);

    if (newAuthor) {
      let query2 = 'INSERT INTO authors (firstName, lastName) VALUES (?, ?)';
      let bindings2 = [firstName, lastName];
      let [result2] = await connection.query(query2, bindings2);
      newAuthorId = result2.insertId;
      // console.log(newAuthorId);
    }

    let query = 'INSERT INTO aibooks (id, type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let bindings = [UUID_SHORT(), type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, newAuthorId];
    let [result] = await connection.query(query, bindings);

    let newBookId = result.insertId;
    // console.log(newBookId);

    await connection.commit();
    // return newBookId;
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

}

//PUT => Update by replace
// PUT a single product
async function updateProductByIdBody(id, type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    let [authors] = await pool.query('SELECT * from authors');

    let newAuthor = false;
    let newAuthorId = null;

    if (lastName == '') {
      lastName = null;
    }

    for (let a of authors) {
      console.log(a);
      if ((a.firstName != firstName) && (firstName != null)) {
        if (a.lastName !== lastName) {
          newAuthor = true;
        }
      } else if ((a.firstName == firstName) && (a.lastName != lastName)) {
          newAuthor = true;
      } else {
        newAuthor = false;
        author_id = a.id;
        newAuthorId = author_id;
        break;
      }
    }

    // console.log(newAuthor);
    // console.log(author_id);
    // console.log(newAuthorId);

    if ((newAuthor) && (firstName != null)) {
      let query4 = 'INSERT INTO authors (firstName, lastName) VALUES (?, ?)';
      let bindings4 = [firstName, lastName];
      let [result4] = await pool.query(query4, bindings4);
      newAuthorId = result4.insertId;
    } else if (firstName != null) {
      let query2 = 'UPDATE authors SET firstName=?, lastName=? WHERE id=?';
      let bindings2 = [firstName, lastName, author_id];
      await pool.query(query2, bindings2);
    }

    // console.log(newAuthorId);
    let query = 'UPDATE aibooks SET type_id=? isbn_10=?, isbn_13=?, title=?, pageCount=?, priceTag=?, image=?, format=?, promotion=?, badge=?, discount=?, review=?, author_id=? WHERE id=?';
    let bindings = [type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, newAuthorId, id];
    const result2 = await pool.query(query, bindings);

    await connection.commit();
    return result2;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

}

//DELETE => Delete
// DELETE a single product
async function deleteProductById(id) {
  const results = await pool.query(`DELETE FROM aibooks WHERE id = ?`, [id]);
  return results;
}

module.exports = {
  getAllProducts,
  getAllProductsBooks,
  getAllProductsImage,
  getAllProductsMusic,
  getAllProductsVideo,
  getProductByProductCodeID,
  getProductByProductID,
  getProductByProductData,
  getProductByProductTitle,
  getProductByProductPrice,
  getProductById,
  createProductByBody,
  updateProductByIdBody,
  deleteProductById
};
