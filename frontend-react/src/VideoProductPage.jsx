import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoProductCard from './VideoProductCard';
import { useFlashMessage } from './FlashMessageStore';

function VideoProductsPage() {
  const { showMessage } = useFlashMessage();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get('/books.json');
        // const response = await axios.get('/products.json');
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
        // setProducts(response.data);
        // const response = await axios.get('/ai-video.json');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/video`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching AI-Video products:', error);
        showMessage('Error fetching AI-Video products!', 'error');
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">AI-Video Products</h1>
      <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <VideoProductCard
                id={product.id}
                type_id={product.type_id}
                videoUrl={product.video}
                imageUrl={product.image}
                promotionName={product.promotion}
                productName={product.title}
                productBadge={product.badge}
                price={product.priceTag.toFixed(2)}
                discount={(product.priceTag * (1 - product.discount)).toFixed(2)}
                review={product.review}
                // isbn_13={product.isbn_13}
                // pageCount={product.pageCount}
                // format={product.format}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default VideoProductsPage;
