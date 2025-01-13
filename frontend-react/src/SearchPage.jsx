import React, { useState, useEffect } from 'react';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';
import Table from './Table.jsx'

function SearchPage() {

  const { showMessage } = useFlashMessage();

  const [products, setProducts] = useState([]);

  const [productCodeID, setproductCodeID] = useState("0");
  const [productID, setproductID] = useState('');
  const [productTitle, setproductTitle] = useState('');
  const [productSearchMode, setproductSearchMode] = useState("type"); // type, id, title
  const [previousProductID, setpreviousProductID] = useState('');

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
    if (productSearchMode == "id") {
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
        productTypeHeader = (
          <>
          <h1 className="text-center mb-4">Search Results for AI-Product ID {previousProductID}</h1>
          </>
        );
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
        showMessage('You have not entered any Product ID!', 'error');
        alert('You have not entered any Product ID!');
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
        // const response = await axios.get(`http://localhost:3000/api/products/productTitle?searchBy=${productTitle}`);
        console.log("productTitle!=null");
        setProducts(response.data);
        console.log(response.data);
        console.log("productSearchMode3", productSearchMode);
        console.log("productCodeID3", productCodeID);
        console.log("productID3", productID);
        console.log("products3", products);
      } else {
        console.log("productTitle is EMPTY");
        showMessage('You have not entered any Product Title!', 'error');
        alert('You have not entered any Product Title!');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products!', 'error');
    }
  }

  return (
    <>
    <div className="container mt-5">
      <h1>Product Search</h1>
      <div className="mb-3">
      <h1>Product Data</h1>
      <Table />
      <label>Search by Product Type</label>
  {/* <select value={productCodeID} onChange={(e) => { setproductCodeID(e.target.value) }}> */}
  <select value={productCodeID} onChange={handleSearchByProductTypeClick}>
    {/* <option value="">Select a Product Type</option> */}
    <option value="0">ALL AI-Products</option>
    <option value="1">AI-Books</option>
    <option value="2">AI-Image</option>
    <option value="3">AI-Music</option>
    <option value="4">AI-Video</option>
  </select>
  {/* <button type="submit" className="btn btn-primary" onClick={handleSearchByProductTypeClick}>Please click to Search by Product Type.</button> */}
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
          <td className="id">{val.id}</td>
          <td className="type_id">{val.type_id}</td>
          <td className="productName">{val.title}</td>
          <td><button>status</button></td>
          <td><button>action1</button><button>action2</button></td>
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
      </tr>
      </tbody>
      </>
                )}
                
            </table>
        {/* </div> */}
      </div>

      <div className="mb-3">
    <label>Search by Product ID</label>
    
  <input type="number" min="1" value={productID} placeholder="Your Product ID here"
    onChange={updateProductID} />

</div>

<button type="submit" className="btn btn-primary" onClick={handleSearchByProductIDClick}>Please click to Search by Product ID.</button>

<div className="mb-3">
    <label>Search by Title (query string)</label>
    
  <input type="text" value={productTitle} placeholder="Your Product Title here"
    onChange={updateProductTitle} />

</div>

<button type="submit" className="btn btn-primary" onClick={handleSearchByProductTitleClick}>Please enter the Title to search.</button>

    </div>
    </>
  );
}

export default SearchPage;
