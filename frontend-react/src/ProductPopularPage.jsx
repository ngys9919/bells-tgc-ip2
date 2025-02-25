import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useProduct } from './ProductStore';
import ProductCard from './ProductCard';
import { useFlashMessage } from './FlashMessageStore';

function ProductsPopularPage() {
  const { showMessage } = useFlashMessage();
  const [products, setProducts] = useState([]);

  const { getProduct, setCurrentProduct } = useProduct();
  
  const product = getProduct(); // Retrieve product from the store

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = null;
        let filtered = null;
        // const response = await axios.get('/books_popular.json');
        // const response = await axios.get('/products.json');
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
        // setProducts(response.data);
        if (product === 'AI-Books') {
          // response = await axios.get('/ai-books.json');
          response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/books`);
          // let filtered = response.data.filter(function(books_popular){
          //   return books_popular.promotion == 'Popular Item';
          // });
          filtered = response.data.filter( books_popular => books_popular.promotion == 'Popular Item');
        } else if (product === 'AI-Image') {
          // response = await axios.get('/ai-image.json');
          response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/image`);
          // let filtered = response.data.filter(function(images_popular){
          //   return images_popular.promotion == 'Popular Item';
          // });
          filtered = response.data.filter( images_popular => images_popular.promotion == 'Popular Item');
        }
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        showMessage('Error fetching products!', 'error');
      }
    };
  
    fetchProducts();
  }, [product]);

  return (
    <div className="container my-5">
      {product === "AI-Books" ? (
        <>
        <h1 className="text-center mb-4">AI-Books Popular Items</h1>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard
                id={product.id}
                pdt_id={product.pdt_id}
                type_id={product.type_id}
                imageUrl={product.image}
                promotionName={product.promotion}
                productName={product.title}
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
      </>
      ) : (
        <>
        <h1 className="text-center mb-4">AI-Image Popular Items</h1>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard
                id={product.id}
                pdt_id={product.pdt_id}
                type_id={product.type_id}
                imageUrl={product.image}
                promotionName={product.promotion}
                productName={product.title}
                productBadge={product.badge}
                price={product.priceTag.toFixed(2)}
                discount={(product.priceTag * (1 - product.discount)).toFixed(2)}
                review={product.review}
                description={product.description}
                fileSize={product.fileSize}
                dateCreated={product.dateCreated}
              />
            </div>
          ))}
      </div>
      </>
      )}
      
    </div>
  );
}

export default ProductsPopularPage;
