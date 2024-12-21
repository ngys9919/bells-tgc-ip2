import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartStore';
import ItemCard from './ItemCard';
import { useFlashMessage } from './FlashMessageStore';
import { useItem } from './ItemStore';
import { useLoginUsername } from './UserStore';
import { Link, useLocation } from 'wouter';

function ItemsPage() {
  const [inputQuantity, setInputQuantity] = useState("1");
  const { addQuantityToCart } = useCart();

  const { showMessage } = useFlashMessage();
  const [relatedItems, setRelatedItems] = useState([]);

  const { itemArray } = useItem();

  // console.log(itemArray);

  const [, setLocation] = useLocation();

  const { getLoginUsername } = useLoginUsername();

  const loginUsername = getLoginUsername();

  useEffect(() => {
    const fetchRelatedItems = async () => {
      try {
        const response = await axios.get('/related.json');
        // const response = await axios.get('/products.json');
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
        console.log('Items:', response.data);
        setRelatedItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
        showMessage('Error fetching items!', 'error');
      }
    };
  
    fetchRelatedItems();
  }, []);

  const handleAddToCart = () => {
    if ((loginUsername === "Guest") || (loginUsername === "null")) {
      showMessage('Please login first!', 'info');
      setLocation('/login');
      // <Link href="/login"></Link>
    } else {
      addQuantityToCart(itemArray[0], inputQuantity);
      showMessage('Item added to cart', 'success');
      setLocation('/cart');
      // <Link href="/cart"></Link>
    }    
  }

  const updateInputQuantity = (e) => {
    setInputQuantity(e.target.value);
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">View Options</h1>
      {itemArray.length === 0 ? (
        <p>Your item is empty.</p>
      ) : (
        <>
        {/* Item section */}
      <section className="py-5">
        {/* This is using props naming format, see HomePage.jsx */}
      <ul className="list-group">
            {itemArray.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-left mb-5 mb-md-0" src={item.imageUrl} alt={item.productName} /></div>
            <div className="col-md-6">
              <div className="small mb-1">ISBN: {item.isbn_13}</div>
              <h1 className="display-5 fw-bolder">{item.productName}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">{item.price}</span>
                <span>${item.discount}</span>
              </div>
              <p className="lead">Page Count: {item.pageCount} <br></br> Format: {item.format}</p>
      {/* This is using json naming format */}
      {/* <ul className="list-group">
            {itemArray.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-left mb-5 mb-md-0" src={item.image} alt={item.bookTitle} /></div>
            <div className="col-md-6">
              <div className="small mb-1">ISBN: {item.isbn_13}</div>
              <h1 className="display-5 fw-bolder">{item.bookTitle}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">{item.priceTag}</span>
                <span>${(item.priceTag * (1 - item.discount)).toFixed(2)}</span>
              </div>
              <p className="lead">Page Count: {item.pageCount} <br></br> Format: {item.format}</p> */}
              <div className="d-flex">
                <input className="form-control text-center me-3" id="inputQuantity" type="num" value={inputQuantity} style={{width: '3rem'}}  onChange={updateInputQuantity}/>
                <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={handleAddToCart}>
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
              </div>
            </div>
          </div>
          </li>
            ))}
          </ul>
          {/* <div className="mt-3 text-end">
            <h4>Total: ${getCartTotal()}</h4>
            <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
          </div> */}
          </section>
        {/* </> */}

        {/* Related items section */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
      <div className="row">
          {relatedItems.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ItemCard
                id={product.id}
                imageUrl={product.image}
                promotionName={product.promotion}
                productName={product.bookTitle}
                productBadge={product.badge}
                price={product.priceTag.toFixed(2)}
                discount={(product.priceTag * (1 - product.discount)).toFixed(2)}
                review={product.review}
                isbn_13={product.isbn_13}
                pageCount={product.pageCount}
                format={product.format}
              />
            </div>
          ))}
      </div>
      </div>
      </section >
      
      </>
      
      )}
  </div>
      
  );
}

export default ItemsPage;
