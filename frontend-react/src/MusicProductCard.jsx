import React from 'react';
import { useCart } from './CartStore';
import { Link, useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import { useLoginUsername } from './UserStore';
import { useItem } from './ItemStore';

const MusicProductCard = (props) => {
  const spacing = 5.2;

  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const { getCurrentLoginUsername } = useLoginUsername();
    
  const  loginUsername = getCurrentLoginUsername();

  const { setItemContent, resetItemContent } = useItem();

  const handleAddToCart = () => {
    if (loginUsername === "Guest") {
      showMessage('Please login first!', 'info');
      setLocation('/login');
      // <Link href="/login"></Link>
    } else {
      addToCart(props);
      showMessage('Item added to cart', 'success');
      setLocation('/cart');
      // <Link href="/cart"></Link>
    }    
  }

  const handleViewOptions = () => {
    // resetItemContent();
    // console.log(props);
    setItemContent(props);
    setLocation('/items');
    // <Link href="/items"></Link> 
  }

  const renderProductPromotion = (promotion) => {
    let productPromotion = <></>;
    if (promotion === "Sale Item") {
      productPromotion = (
        <>
          <h5 className="fw-bolder bg-danger">{props.promotionName}</h5>
        </>
      );
    } else if (promotion === "Special Item") {
      productPromotion = (
        <>
          <h5 className="fw-bolder bg-success">{props.promotionName}</h5>
        </>
      );  
    } else if (promotion === "New Arrivals") {
      productPromotion = (
        <>
          <h5 className="fw-bolder bg-info">{props.promotionName}</h5>
        </>
      );  
    } else {
      productPromotion = (
        <>
          <h5 className="fw-bolder bg-primary">{props.promotionName}</h5>
        </>
      );
    }
    return productPromotion;
  };

  const renderProductReview = (review) => {
    let productReview = <></>;
    if (review === 5) {
      productReview = (
        <>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        </>
      );
    } else if (review === 4) {
      productReview = (
        <>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        </>
      );  
    } else if (review === 3) {
      productReview = (
        <>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        </>
      );
    } else if (review === 2) {
      productReview = (
        <>
        <div className="bi-star-fill"></div>
        <div className="bi-star-fill"></div>
        </>
      );
    } else if (review === 1) {
      productReview = (
        <>
        <div className="bi-star-fill"></div>
        </>
      );
    } else {
        productReview = (
          <>
          </>
        );
    }
    return productReview;
  };

  return (
    // <div className="card">
    //   <img
    //     src={props.imageUrl}
    //     className="card-img-top"
    //     alt={props.productName}
    //   />
    //   <div className="card-body">
    //     <h5 className="card-title">{props.productName}</h5>
    //     <p className="card-text">${props.price}</p>
    //     <button className="btn btn-primary" onClick={handleAddToCart}>
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>


    <div className="col mb-5">
      {/* <div className="col"> */}
      <div className="card h-100">
      {/* <div className="card"> */}
        {/* Sale badge */}
        <div className="badge bg-primary text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>{props.productBadge}</div>
        {/* Product image */}
        {/* <img style={{ width: 'auto', height: 'auto' }} className="card-img-top" src={props.imageUrl} alt={props.productName} /> */}
        <img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} className="card-img-top" src={props.imageUrl} alt={props.productName} />
        {/* Product File */}
        {/* <div style={{ marginLeft: spacing + 'em' }}> */}
        <div className="d-flex justify-content-center">
        
        {/* <audio controls autoPlay muted src={props.musicUrl} type="audio/mpeg"> */}
        <audio controls src={props.musicUrl} type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
    </div>
        {/* Product details */}
        {/* <div className="card-body p-4"> */}
        <div className="card-body">
          <div className="text-center">
            {/* Product name */}
            {renderProductPromotion(props.promotionName)}
            {/* <h5 className="fw-bolder bg-primary">{props.promotionName}</h5> */}
            <h5 className="fw-bolder">{props.productName}</h5>
            {/* Product reviews */} 
            <div className="d-flex justify-content-center small text-warning mb-2">
              {renderProductReview(props.review)}
            </div>
            {/* Product price */}
            {props.discount === props.price ? (
              <p className="card-text">${props.price}</p>
            ) : ( 
              <> <span className="text-muted text-decoration-line-through">${props.price}</span>
              ${props.discount} 
              </>
            )}
          </div>
        </div>
        {/* Product actions */}
        {/* {props.review === 5 ? (
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={handleViewOptions}>View options</a></div>
          </div>
        ) : (
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={handleAddToCart}>Add to cart</a></div>
          </div>
        )} */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={handleAddToCart}>Add to cart</a></div>
        </div>
      </div>
    </div>
  );
};

export default MusicProductCard;
