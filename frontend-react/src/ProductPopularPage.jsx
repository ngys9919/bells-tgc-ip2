import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useFlashMessage } from './FlashMessageStore';

function ProductsPopularPage() {
  const { showMessage } = useFlashMessage();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/books_popular.json');
        // const response = await axios.get('/products.json');
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        showMessage('Error fetching products!', 'error');
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Popular Items</h1>
      <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard
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
  );
}

export default ProductsPopularPage;
