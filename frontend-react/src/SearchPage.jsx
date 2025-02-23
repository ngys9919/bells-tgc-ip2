import React, { useState, useEffect } from 'react';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';
import Table from './Table.jsx'

import { useCart } from './CartStore';
import { useItem } from './ItemStore';
import { useLoginUsername } from './UserStore';
import { Link, useLocation } from 'wouter';

import MyComponent1 from './UsersProfile.jsx';
import MyComponent2 from './UsersProfileInput.jsx';

// use either index.scss or index.sass
// import './index.scss';
import './index.sass';

// use either style.scss or style.sass
import './style.scss';
// import './style.sass';

function SearchPage() {

  const { showMessage } = useFlashMessage();

  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({id: '', type_id: '', productID: '', source_table: '', title: ''});
  const [tellMeMore, setTellMeMore] = useState(false);
  const [productDetailsID, setProductDetailsID] = useState(0);


  const [productCodeID, setproductCodeID] = useState("0");
  const [productID, setproductID] = useState('');
  const [productTitle, setproductTitle] = useState('');
  const [productSearchMode, setproductSearchMode] = useState("type"); // type, id, title, price
  const [previousProductID, setpreviousProductID] = useState('');
  const [productSearchError, setproductSearchError] = useState("null"); // id, title

  const [productMinPrice, setproductMinPrice] = useState('');
  const [productMaxPrice, setproductMaxPrice] = useState('');

  const [inputQuantity, setInputQuantity] = useState("1");
  const { addQuantityToCart } = useCart();

  const { itemArray } = useItem();
  
    // console.log(itemArray);
  
    const [, setLocation] = useLocation();
  
    const { getCurrentLoginUsername } = useLoginUsername();
      
    const  loginUsername = getCurrentLoginUsername();

    const { setItemContent } = useItem();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // console.log(productCodeID);
        if ((productCodeID >= 0) && (productCodeID <= 4)) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/productCodeID/${productCodeID}`);
          // const response = await axios.get(`http://localhost:3000/api/products/productCodeID/${productCodeID}`);
          console.log("productCodeID=0to4: ", productCodeID);
          setProducts(response.data);
          console.log(response.data);
          console.log("productSearchMode1", productSearchMode);
          console.log("productCodeID1", productCodeID);
          console.log("productID1", productID);
          console.log("products1", products);
        // } else if (productCodeID == (-1)) {
        //   setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
        } else {
          // setProducts([]);
          setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        showMessage('Error fetching products!', 'error');
      }
    };
  
    fetchProducts();

  }, [productCodeID]);
  
  const handleSearchByProductTypeClick = (e) => {
    setproductSearchMode("type"); 
    setproductCodeID(e.target.value);
    setproductID('');
    console.log(e.target.value);
  }

  // products             products.length   productID     productCodeID   productTypeHeader
  
  // Object for products
  // setProducts(response.data); -> updateProductID -> handleSearchByProductIDClick -> err: setProducts([]);
  // setProducts([]);
  //                            0              x                -1        AI-Product ID {productID} NOT FOUND!
  //
  // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
  //                            1              n                -1        AI-Product ID {productID}
  //

  // Array for products
  // setProducts(response.data); -> handleSearchByProductTypeClick -> useEffect(fetchProducts({}, [productCodeID])); -> err: 
  //                            n              0                -1        List of AI-Products
  //                            n              0          0 <= type_id <= 4  
  //
  //                            n              0                 0         Complete List of ALL AI-Products
  //                            n              0                 1         Complete List of AI-Books Products
  //                            n              0                 2         Complete List of AI-Image Products
  //                            n              0                 3         Complete List of AI-Music Products
  //                            n              0                 4         Complete List of AI-Video Products
  //                            n              0                else       No AI-Products Listing
  

  const renderProductTypeHeader = (productCodeID) => {
    let productTypeHeader = <></>;
    if (productSearchMode == "error") {
      if (productSearchError == "id") {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Error!</h1>
          <h1 className="text-center mb-4">You have not entered any Product ID!</h1>
          </>
        );
      } else if (productSearchError == "title") {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Error!</h1>
          <h1 className="text-center mb-4">You have not entered any Product Title!</h1>
          </>
        );
      } else if (productSearchError == "price") {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Error!</h1>
          <h1 className="text-center mb-4">You have not entered any Product Price Range!</h1>
          </>
        );
      } else {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Error!</h1>
          {productSearchError == "id" ? (
            <h1 className="text-center mb-4">You have not entered any Product ID!</h1>
          ) : (
            <h1 className="text-center mb-4">You have not entered any inputs!</h1>
          ) }
          </>
        );
      }
      
    } else if (productSearchMode == "id") {
      if (products.length == 0) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">AI-Product ID {previousProductID} NOT FOUND!</h1>
          </>
        );
      } else if (products.length == 1) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">AI-Product ID {previousProductID}</h1>
            </>
          );
      } else {
        {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for AI-Product ID {previousProductID}</h1>
            </>
          );
        }    
      }     
    } else if (productSearchMode == "type") {
      if (productID == (0)) {

      if (productCodeID == 0) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Complete List of ALL AI-Products</h1>
          </>
        );
      } else if (productCodeID == 1) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Complete List of AI-Books Products</h1>
          </>
        );
      } else if (productCodeID == 2) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Complete List of AI-Image Products</h1>
          </>
        );
      } else if (productCodeID == 3) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Complete List of AI-Music Products</h1>
          </>
        );
      } else if (productCodeID == 4) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Complete List of AI-Video Products</h1>
          </>
        );
      }
    }
    } else if (productSearchMode == "title") {
      if (productCodeID == 0) {
        if (products.length == 0) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">AI-Product NOT FOUND!</h1>
            </>
          );
        } else {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for ALL AI-Products</h1>
            </>
          );
        }
        
      } else if (productCodeID == 1) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for AI-Books Products</h1>
            {products.length == 0 ? (
              <h1 className="text-center mb-4">AI-Books Product NOT FOUND!</h1>
            ) : (
              <h1 className="text-center mb-4"></h1>
            ) }
            </>
          );
      } else if (productCodeID == 2) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Results for AI-Image Products</h1>
          {products.length == 0 ? (
            <h1 className="text-center mb-4">AI-Image Product NOT FOUND!</h1>
          ) : (
            <h1 className="text-center mb-4"></h1>
          ) }
          </>
        );
      } else if (productCodeID == 3) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Results for AI-Music Products</h1>
          {products.length == 0 ? (
            <h1 className="text-center mb-4">AI-Music Product NOT FOUND!</h1>
          ) : (
            <h1 className="text-center mb-4"></h1>
          ) }
          </>
        );
      } else if (productCodeID == 4) {
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Results for AI-Video Products</h1>
          {products.length == 0 ? (
            <h1 className="text-center mb-4">AI-Video Product NOT FOUND!</h1>
          ) : (
            <h1 className="text-center mb-4"></h1>
          ) }
          </>
        );
      }
     } else if (productSearchMode == "price") {
        if (productCodeID == 0) {
          if (products.length == 0) {
            productTypeHeader = (
              <>
              <h1 className="text-center mb-4">AI-Product NOT FOUND!</h1>
              </>
            );
          } else {
            productTypeHeader = (
              <>
              <h1 className="text-center mb-4">Search Results for ALL AI-Products</h1>
              </>
            );
          }
          
        } else if (productCodeID == 1) {
            productTypeHeader = (
              <>
              <h1 className="text-center mb-4">Search Results for AI-Books Products</h1>
              {products.length == 0 ? (
                <h1 className="text-center mb-4">AI-Books Product NOT FOUND!</h1>
              ) : (
                <h1 className="text-center mb-4"></h1>
              ) }
              </>
            );
        } else if (productCodeID == 2) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for AI-Image Products</h1>
            {products.length == 0 ? (
              <h1 className="text-center mb-4">AI-Image Product NOT FOUND!</h1>
            ) : (
              <h1 className="text-center mb-4"></h1>
            ) }
            </>
          );
        } else if (productCodeID == 3) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for AI-Music Products</h1>
            {products.length == 0 ? (
              <h1 className="text-center mb-4">AI-Music Product NOT FOUND!</h1>
            ) : (
              <h1 className="text-center mb-4"></h1>
            ) }
            </>
          );
        } else if (productCodeID == 4) {
          productTypeHeader = (
            <>
            <h1 className="text-center mb-4">Search Results for AI-Video Products</h1>
            {products.length == 0 ? (
              <h1 className="text-center mb-4">AI-Video Product NOT FOUND!</h1>
            ) : (
              <h1 className="text-center mb-4"></h1>
            ) }
            </>
          );
        }
    }
    
    return productTypeHeader;
  };

  // every event handler in React will recieve one parameter which is
  // event data (automatically) as the first argument
  const updateProductID = (e) => {
    setproductSearchMode("id");
    // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
    setproductID(e.target.value);
    if (e.target.value < 0) {
      setproductID((-1) * e.target.value);
    } else if (e.target.value == 0) {
      setproductID('');
      // setproductCodeID(-1);
    }
    console.log(e.target.value);
  }

  const handleSearchByProductIDClick = async () => {
    setproductSearchMode("id");
    // setpreviousProductID(productID);
    try {
      if (productID != 0) {
        setpreviousProductID(productID);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/productID/${productID}`);
        // const response = await axios.get(`http://localhost:3000/api/products/productID/${productID}`);
        console.log("productID!=0");
        setProducts(response.data);
        
        console.log(response.data);
        console.log("productSearchMode2", productSearchMode);
        console.log("productCodeID2", productCodeID);
        console.log("productID2", productID);
        console.log("products2", products);
      } else {
        console.log("productID is ZERO");
        // setproductCodeID(-1);
        setproductSearchError("id");
        setproductSearchMode("error");
        setProducts([]);
        // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
        showMessage('You have not entered any Product ID!', 'error');
        // alert('You have not entered any Product ID!');
      }
      
    } catch (error) {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products!', 'error');
      setProducts([]);
    }
  }

  const updateProductTitle = (e) => {
    setproductSearchMode("title");
    setproductTitle(e.target.value);
    console.log(e.target.value);
  }

  const handleSearchByProductTitleClick = async () => {
    setproductSearchMode("title");
    try {
    
      if (productTitle) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/productTitle?searchBy=${productTitle}&filterAIproducts=${productCodeID}`);
        // const response = await axios.get(`http://localhost:3000/api/products/productTitle?searchBy=${productTitle}&filterAIproducts=${productCodeID}`);
        console.log("productTitle!=null");
        setProducts(response.data);
        console.log(response.data);
        console.log("productSearchMode3", productSearchMode);
        console.log("productCodeID3", productCodeID);
        console.log("productID3", productID);
        console.log("products3", products);
      } else {
        console.log("productTitle is EMPTY");
        // setproductCodeID(-1);
        setproductSearchError("title");
        setproductSearchMode("error");
        setProducts([]);
        // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
        showMessage('You have not entered any Product Title!', 'error');
        // alert('You have not entered any Product Title!');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products!', 'error');
      setProducts([]);
    }
  }

  const handleAddToCart = () => {
    if (loginUsername === "Guest") {
      showMessage('Please login first!', 'info');
      setLocation('/login');
      // <Link href="/login"></Link>
    } else {
      console.log("itemArray[0]", itemArray[0]);
      console.log("inputQuantity", inputQuantity);
      addQuantityToCart(itemArray[0], inputQuantity);
      showMessage('Item added to cart', 'success');
      setLocation('/cart');
      // <Link href="/cart"></Link>
    }    
  }

  const updateInputQuantity = (e) => {
    setInputQuantity(e.target.value);
  }
  
  const productPicture= (item) => {
    let productPictureInfo = <></>;
    const type_id = item.type_id;
    const id = item.id;

    // 1. clone the original array
    // const clonedItem = item.slice();
    // const clonedItem = [...item];

    // // 1. clone the original object
    const clonedItem = {...item};

    if (type_id === 1) {
      productPictureInfo = (
        <>
          <div className="col-md-6"><img style={{ width: '480px', height: '640px' }} className="card-img-left mb-5 mb-md-0" src={clonedItem.imageUrl} alt={clonedItem.productName} /></div>
          {/* <img src={clonedItem.imageUrl} alt={clonedItem.productName} /> */}
        </>
      );
    } else if (type_id === 2) {
      productPictureInfo = (
        <>
          <div className="col-md-6"><img style={{ width: '480px', height: '480px' }} className="card-img-left mb-5 mb-md-0" src={clonedItem.imageUrl} alt={clonedItem.productName} /></div>
          {/* <img style={{ width: '480px', height: '480px' }} src={clonedItem.imageUrl} alt={clonedItem.productName} /> */}
        </>
      );
    } else if (type_id === 3) {
      productPictureInfo = (
        <>
          <div className="col-md-6"><img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} className="card-img-left mb-5 mb-md-0" src={clonedItem.imageUrl} alt={clonedItem.productName} /></div>
          {/* <img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} src={clonedItem.imageUrl} alt={clonedItem.productName} /> */}
        </>
      );
    } else if (type_id === 4) {
      productPictureInfo = (
        <>
          <div className="col-md-6"><img style={{ width: '480px', height: '480px' }} className="card-img-left mb-5 mb-md-0" src={clonedItem.imageUrl} alt={clonedItem.productName} /></div>
          {/* <img style={{ width: '480px', height: '480px' }} src={clonedItem.imageUrl} alt={clonedItem.productName} /> */}
        </>
      );
    }
    return productPictureInfo;
  };

  const updateProductDetails = async () => {
    try {
    
      if (productDetailsID) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productDetailsID}`);
        // const response = await axios.get(`http://localhost:3000/api/products/${productDetailsID}`);
        console.log("productDetailsID!=null");
        setProductDetails(response.data);
        setItemContent(response.data);
        console.log(response.data);
        // setTellMeMore(!tellMeMore);
        console.log("productSearchMode4", productSearchMode);
        console.log("productCodeID4", productCodeID);
        console.log("productID4", productID);
        console.log("products4", products);
        console.log("productDetailsID4", productDetailsID);
        console.log("productDetails4", productDetails);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products!', 'error');
      setProductDetails({});
    }
    // setItemContent(productDetails);
  }

  const handleTellMeMoreClick = async () => {
    setTellMeMore(!tellMeMore);
  }

  // Fetch the product details data when the component mounts
  useEffect(() => {
    updateProductDetails();
  }, [tellMeMore]);

  if (tellMeMore) {
    // console.log("itemAray", itemArray);
    return (
      <div className="container my-5">
      <h1 className="text-center mb-4">Product details...</h1>

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
          {productPicture(item)}
          {/* {item.type_id == "AI-Books" ? (
              <div className="col-md-6"><img style={{ width: '480px', height: '640px' }} className="card-img-left mb-5 mb-md-0" src={item.imageUrl} alt={item.productName} /></div>
            ) : (
              <div className="col-md-6"><img style={{ width: '480px', height: '480px' }} className="card-img-left mb-5 mb-md-0" src={item.imageUrl} alt={item.productName} /></div>
            )} */}
            {/* <div className="col-md-6"><img className="card-img-left mb-5 mb-md-0" src={item.imageUrl} alt={item.productName} /></div> */}
            <div className="col-md-6">
            {item.type_id == "AI-Books" ? (
              <div className="small mb-1">ISBN: {item.isbn_13}</div>
            ) : (
              <div className="small mb-1">Description: {item.description}</div>
            )}
              <h1 className="display-5 fw-bolder">{item.productName}</h1>
              <div className="fs-5 mb-5">
              {item.discount == parseFloat(0) ? (
                  <>
                    <span>${item.price}</span>
                  </>
                ) : (
                  <>
                    <span className="text-decoration-line-through">${item.price}</span>
                    <span>${(item.price * (1 - item.discount)).toFixed(2)}</span>
                  </>
                )}
              </div>
              {item.type_id == "AI-Books" ? (
              <p className="lead">Page Count: {item.pageCount} <br></br> Format: {item.format}</p>
            ) : (
              <p className="lead">File Size: {item.fileSize} <br></br> Date Created: {item.dateCreated}</p>
            )}
              
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
      <button className="btn btn-primary" onClick={handleTellMeMoreClick}>Back to Product Search</button>
      </>
      )}
      </div>
      );
  }

  const updateProductMinPrice = (e) => {
    // setproductSearchMode("price");
    // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
    setproductMinPrice(e.target.value);
    if (e.target.value < 0) {
      setproductMinPrice((-1) * e.target.value);
    }
    console.log(e.target.value);
  }

  const updateProductMaxPrice = (e) => {
    // setproductSearchMode("price");
    // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
    setproductMaxPrice(e.target.value);
    if (e.target.value < 0) {
      setproductMaxPrice((-1) * e.target.value);
    }
    console.log(e.target.value);
  }

  const handleSearchByProductPriceClick = async () => {
    setproductSearchMode("price");
    try {
      if (((!productMinPrice) && (!productMaxPrice))) {
        console.log("productPrice is EMPTY");
        // setproductCodeID(-1);
        setproductSearchError("price");
        setproductSearchMode("error");
        setProducts([]);
        // setProducts([{id: '', type_id: '', productID: '', source_table: '', title: ''}]);
        showMessage('You have not entered any Product Price Range!', 'error');
        // alert('You have not entered any Product Price Range!');
      } else {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/productPrice?searchByMinPrice=${productMinPrice}&searchByMaxPrice=${productMaxPrice}&filterAIproducts=${productCodeID}`);
        // const response = await axios.get(`http://localhost:3000/api/products/productPrice?searchByMinPrice=${productMinPrice}&searchByMaxPrice=${productMaxPrice}&filterAIproducts=${productCodeID}`);
        console.log("productID!=0");
        setProducts(response.data);
        
        console.log(response.data);
        console.log("productSearchMode5", productSearchMode);
        console.log("productCodeID5", productCodeID);
        console.log("productID5", productID);
        console.log("products5", products);
        } 
      }
      catch (error) {
        console.error('Error fetching products:', error);
        showMessage('Error fetching products!', 'error');
        setProducts([]);
      }
        
  }

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product Search</h1>
      <div className="mb-3">
      <h1>AI-Products Data</h1>
      <Table />
      
  {/* <button type="submit" className="btn btn-primary" onClick={handleSearchByProductTypeClick}>Please click to Search by Product Type.</button> */}
</div>

<div className="mb-3">
  <h1>Search by... </h1>
</div>
<label>Search by Product Type&emsp;</label>
  {/* <select value={productCodeID} onChange={(e) => { setproductCodeID(e.target.value) }}> */}
  <select className="form-control me-2" value={productCodeID} onChange={handleSearchByProductTypeClick}>
    {/* <option value="">Select a Product Type</option> */}
    <option value="0">ALL AI-Products</option>
    <option value="1">AI-Books</option>
    <option value="2">AI-Image</option>
    <option value="3">AI-Music</option>
    <option value="4">AI-Video</option>
  </select>

<div className="spacer">
</div>

<div class="row justify-content-start">
    <div class="col-4">
    <label>Search by Product ID&emsp;</label>
    <input className="form-control me-2" type="number" min="1" value={productID} placeholder="Your Product ID here"
    onChange={updateProductID} />
    <button type="submit" className="btn btn-primary mr-2 my-2" onClick={handleSearchByProductIDClick}>Please click to Search by Product ID.</button>
    </div>
    <div class="col-4">
    <label>Search by Title (query string)&emsp;</label>
    <input className="form-control me-2" type="text" value={productTitle} placeholder="Your Product Title here"
    onChange={updateProductTitle} />
    <button type="submit" className="btn btn-primary mr-2 my-2" onClick={handleSearchByProductTitleClick}>Please enter the Title to search.</button>
    </div>
    <div class="col-4">
    <label>Search by Price ($)&emsp;</label>
    <input className="form-control me-2" type="number" value={productMinPrice} placeholder="lower limit for price"
    onChange={updateProductMinPrice} />
    <input className="form-control me-2" type="number" value={productMaxPrice} placeholder="upper limit for price"
    onChange={updateProductMaxPrice} />
    <button type="submit" className="btn btn-primary mr-2 my-2" onClick={handleSearchByProductPriceClick}>Please key-in the price range to search.</button>
    </div>
</div>





{renderProductTypeHeader(productCodeID)}

      {/* <h1 className="text-center mb-4">Complete List of AI-Products</h1> */}
        <div className="row">
        {/* <div className="mb-3"> */}
            <table>
            <thead>
                <tr>
                    <th className="id">Product ID</th>
                    <th className="type_id">Product Type</th>
                    <th className="productName">Title</th>
                    {productSearchMode == "price" ? (
                      <>
                      <th className="price">Price Tag ($)</th>
                      <th className="discountPercentage">Discount</th>
                      <th className="finalPrice">Final Price ($)</th>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                </tr>
                </thead>
        

        
                {/* {productID == 0 ? ( */}
                {/* {(products.length > 1) ? ( */}
                {(Array.isArray(products)) ? (                
                  <>
{products.map((val, key) => {
  return (
    <tbody>
      <tr key={key}>
        {productSearchMode == "price" ? (
          <>
          <td className="id">{val.id}</td>
          <td className="type_id">{val.type_id}</td>
          <td className="productName">{val.title}</td>
          <td className="price">{val.priceTag}</td>
          <td className="discountPercentage">{val.discountPercentage}</td>
          <td className="finalPrice">{val.finalPrice}</td>
          </>
        ) : (
          <>
          <td className="id">{val.id}</td>
          <td className="type_id">{val.type_id}</td>
          <td className="productName">{val.title}</td>
          </>
        )} 
          
          <td><button className="btn btn-success" onClick={() => {
          console.log("val.id", val.id);
          setProductDetailsID(val.id);
          handleTellMeMoreClick();
        }}>Tell me more...</button></td>
          {/* <td><button>action1</button><button>action2</button></td> */}
      </tr>
      </tbody>
  )
})}
</>
                ) : (
                  <>
                  <tbody>
<tr>
          <td className="id">{products.id}</td>
          <td className="type_id">{products.type_id}</td>
          <td className="productName">{products.title}</td>
          <td><button className="btn btn-success" onClick={() => {
          console.log("products.id", products.id);
          setProductDetailsID(products.id);
          handleTellMeMoreClick();
        }}>Tell me more...</button></td>
      </tr>
      </tbody>
      </>
                )}
                
            </table>
        {/* </div> */}
      </div>
      
      <div className="mb-3">
      <h1 className="text-center mb-4">Complete List of AI-eShop Users</h1>
      {/* <MyComponent2/> */}
      <h1>Users Profile</h1>
      <MyComponent1/>
      </div>
    </div>
    </>
  );
}

export default SearchPage;
