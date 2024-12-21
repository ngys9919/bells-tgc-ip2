const pool = require('../database');

async function getAllProducts() {
  const [rows] = await pool.query('SELECT id, bookTitle, CAST(priceTag AS DOUBLE) AS priceTag, image, promotion, badge, discount, review FROM books');
  return rows;
}

//GET => Read
// GET a single product
async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

//POST => Create
// POST a single product
async function createProductByBody(isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
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

    let query = 'INSERT INTO books (isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let bindings = [isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, newAuthorId];
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
async function updateProductByIdBody(id, isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName) {
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
    let query = 'UPDATE books SET isbn_10=?, isbn_13=?, bookTitle=?, pageCount=?, priceTag=?, image=?, format=?, promotion=?, badge=?, discount=?, review=?, author_id=? WHERE id=?';
    let bindings = [isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, newAuthorId, id];
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
  const results = await pool.query(`DELETE FROM books WHERE id = ?`, [id]);
  return results;
}

module.exports = {
  getAllProducts, getProductById, createProductByBody, updateProductByIdBody, deleteProductById
};
