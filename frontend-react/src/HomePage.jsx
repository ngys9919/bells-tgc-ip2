import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useProduct } from './ProductStore';
import ProductCard from './ProductCard';
import ImageProductCard from './ImageProductCard';
import MusicProductCard from './MusicProductCard';
import VideoProductCard from './VideoProductCard';
import { useLoginUsername } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import { Link } from 'wouter';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function HomePage() {
  const { showMessage } = useFlashMessage();

  const { getProduct, setCurrentProduct } = useProduct();
  
  const product = getProduct(); // Retrieve product from the store

  const { getCurrentLoginUsername } = useLoginUsername();
  
  const  loginUsername = getCurrentLoginUsername();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProductsImage, setFeaturedProductsImage] = useState([]);
  const [featuredProductsMusic, setFeaturedProductsMusic] = useState([]);
  const [featuredProductsVideo, setFeaturedProductsVideo] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // const response = await axios.get('/bestsellers.json');
        // const response = await axios.get('/featured.json');
        // const response = await axios.get('/products.json');
        // setFeaturedProducts(response.data);
        const response = await axios.get('/ai-books.json');
        // let filtered = response.data.filter(function(bestsellers){
        //   return bestsellers.review == 5;
        // });
        let filtered = response.data.filter( bestsellers => bestsellers.review == 5)
        setFeaturedProducts(filtered);
        // setCurrentProduct("AI-Books");
      } catch (error) {
        console.error('Error fetching featured products:', error);
        showMessage('Error fetching featured products!', 'error');
      }
    };

    fetchFeaturedProducts();
  }, []);

  const renderFeaturedProducts = () => {
    const productElements = [];
    for (const product of featuredProducts) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <ProductCard
            id={product.id}
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
            // description={product.description}
            // fileSize={product.fileSize}
            // dateCreated={product.dateCreated}
          />
        </div>
      );
    }
    return productElements;
  };

  useEffect(() => {
    const fetchFeaturedProductsImage = async () => {
      try {
        // const response = await axios.get('/bestsellers.json');
        // const response = await axios.get('/featured.json');
        // const response = await axios.get('/products.json');
        // setFeaturedProducts(response.data);
        const response = await axios.get('/ai-image.json');
        // let filtered = response.data.filter(function(bestsellers){
        //   return bestsellers.review == 5;
        // });
        let filtered = response.data.filter( bestsellers => bestsellers.review == 5)
        setFeaturedProductsImage(filtered);
        // setCurrentProduct("AI-Image");
      } catch (error) {
        console.error('Error fetching featured products:', error);
        showMessage('Error fetching featured products!', 'error');
      }
    };

    fetchFeaturedProductsImage();
  }, []);

  const renderFeaturedProductsImage = () => {
    const productElements = [];
    for (const product of featuredProductsImage) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <ImageProductCard
            id={product.id}
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
            description={product.description}
            fileSize={product.fileSize}
            dateCreated={product.dateCreated}
          />
        </div>
      );
    }
    return productElements;
  };

  useEffect(() => {
    const fetchFeaturedProductsMusic = async () => {
      try {
        // const response = await axios.get('/bestsellers.json');
        // const response = await axios.get('/featured.json');
        // const response = await axios.get('/products.json');
        // setFeaturedProducts(response.data);
        const response = await axios.get('/ai-music.json');
        // let filtered = response.data.filter(function(bestsellers){
        //   return bestsellers.review == 5;
        // });
        let filtered = response.data.filter( bestsellers => bestsellers.review == 5)
        setFeaturedProductsMusic(filtered);
        // setCurrentProduct("AI-Music");
      } catch (error) {
        console.error('Error fetching featured products:', error);
        showMessage('Error fetching featured products!', 'error');
      }
    };

    fetchFeaturedProductsMusic();
  }, []);

  const renderFeaturedProductsMusic = () => {
    const productElements = [];
    for (const product of featuredProductsMusic) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <MusicProductCard
            id={product.id}
            musicUrl={product.music}
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
            // description={product.description}
            // fileSize={product.fileSize}
            // dateCreated={product.dateCreated}
          />
        </div>
      );
    }
    return productElements;
  };

  useEffect(() => {
    const fetchFeaturedProductsVideo = async () => {
      try {
        // const response = await axios.get('/bestsellers.json');
        // const response = await axios.get('/featured.json');
        // const response = await axios.get('/products.json');
        // setFeaturedProducts(response.data);
        const response = await axios.get('/ai-video.json');
        // let filtered = response.data.filter(function(bestsellers){
        //   return bestsellers.review == 5;
        // });
        let filtered = response.data.filter( bestsellers => bestsellers.review == 5)
        setFeaturedProductsVideo(filtered);
        // setCurrentProduct("AI-Video");
      } catch (error) {
        console.error('Error fetching featured products:', error);
        showMessage('Error fetching featured products!', 'error');
      }
    };

    fetchFeaturedProductsVideo();
  }, []);
  
  const renderFeaturedProductsVideo = () => {
    const productElements = [];
    for (const product of featuredProductsVideo) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <VideoProductCard
            id={product.id}
            videoUrl={product.video}
            promotionName={product.promotion}
            productName={product.title}
            productBadge={product.badge}
            price={product.priceTag.toFixed(2)}
            discount={(product.priceTag * (1 - product.discount)).toFixed(2)}
            review={product.review}
            // isbn_13={product.isbn_13}
            // pageCount={product.pageCount}
            // format={product.format}
            // description={product.description}
            // fileSize={product.fileSize}
            // dateCreated={product.dateCreated}
          />
        </div>
      );
    }
    return productElements;
  };

  // class HomePage extends Component {
  // render() {
  //   const myStyle = {
  //       backgroundImage:
  //           "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
  //       height: "100vh",
  //       marginTop: "-70px",
  //       fontSize: "50px",
  //       backgroundSize: "cover",
  //       backgroundRepeat: "no-repeat",
  //   };
  //   return (
  //     <div style={myStyle}>
  //         <h1> geeksforgeeks </h1>
  //     </div>
  // );
// }
// }

  return (
    <>

      {/* Header */}
<header className="bg-light py-5">
  <div className="background">
    {/* <div className="container px-4 px-lg-5 my-5"> */}
    <div className="container">
        <div className="text-center text-info">
            <h1 className="display-4 fw-bolder">Hi, {loginUsername}! <br></br> Welcome to AI-eShop</h1>
            <p className="lead fw-normal text-dark mb-0"><strong>Find your favourite AI stuffs at wholesale prices!</strong></p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
    </div>
  </div>
</header>

      <main className="container my-5">
        <h2 className="text-center mb-4">Best-Seller AI-Books</h2>
        {/* Product Cards Here */}
        <div className="row">
          {renderFeaturedProducts()}
        </div>
        <h2 className="text-center mb-4">Best-Seller AI-Image</h2>
        {/* Product Cards Here */}
        <div className="row">
          {renderFeaturedProductsImage()}
        </div>
        <h2 className="text-center mb-4">Best-Seller AI-Music</h2>
        {/* Product Cards Here */}
        <div className="row">
          {renderFeaturedProductsMusic()}
        </div>
        <h2 className="text-center mb-4">Best-Seller AI-Video</h2>
        {/* Product Cards Here */}
        <div className="row">
          {renderFeaturedProductsVideo()}
        </div>
      </main>


    </>
  );
}

export default HomePage;
