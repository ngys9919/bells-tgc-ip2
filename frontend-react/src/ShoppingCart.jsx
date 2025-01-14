import React, { useEffect, useRef } from 'react';
import { useCart } from './CartStore';
import { useJwt } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';
import { useLoginUsername } from './UserStore';

const ShoppingCart = () => {
  // const isFirstRender = useRef(true); // Track first render

  const { getCurrentLoginUsername } = useLoginUsername();
      
  const  loginUsername = getCurrentLoginUsername();
  // console.log(loginUsername);

  // const { cart, getCartTotal, modifyQuantity, removeFromCart, setCartContent } = useCart();
  // Get functions and state from the cart store
  const {
    getCart,
    getCartTotal,
    addToCart,
    modifyCart,
    // modifyQuantity,
    deleteCartItem,
    // removeFromCart,
    fetchCart,
    resetCartContent,
    isLoading,
    updateCart,
  } = useCart();

  const { showMessage } = useFlashMessage();

  const cart = getCart(); // Retrieve cart from the store

  const { getJwt } = useJwt();

  // Set cart to empty for Guest
  useEffect(() => {
    if (loginUsername === "Guest") { 
      resetCartContent([]);
      // console.log(200);
      updateCart();
      return; // Only for Guest
    }
  }, [loginUsername]);

  // Fetch the cart data when the component mounts
  useEffect(() => {
    fetchCart();
    // return ()=>{console.log('cleanup')}
  }, []);

  // API: Handle Checkout
  const handleCheckout = async () => {
    const jwt = getJwt();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, {}, {
        // const response = await axios.post(`http://localhost:3000/api/checkout`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const { url: sessionUrl } = response.data;
      window.location = `${sessionUrl}`;
      // Redirect to Stripe Checkout
      // window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
      // alert("Checkout failed. Please try again.");
      showMessage('Error during checkout!', 'error');
    } finally {

    }
  };

  // useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return; // Skip the first render
    // }
    // console.log(200);
    // updateCart();
    // return ()=>{console.log('cleanup')}
  // }, [cart]);

  // const imageUrlTest = "https://picsum.photos/id/225/300/200";
  // const productNameTest = "Organic Green Tea";

  // const productBooks = (<img src={imageUrlTest} alt={productNameTest} />);

  // const productImage = (<img style={{ width: '480px', height: '480px' }} src={imageUrlTest} alt={productNameTest} />);

  // const productMusic = (<img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} src={imageUrlTest} alt={productNameTest} />);

  // const productVideo = (<img style={{ width: '480px', height: '480px' }} src={imageUrlTest} alt={productNameTest} />);

  // const productBooks = (<img src={item.imageUrl} alt={item.productName} />);

  // const productImage = (<img style={{ width: '480px', height: '480px' }} src={item.imageUrl} alt={item.productName} />);

  // const productMusic = (<img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} src={item.imageUrl} alt={item.productName} />);

  // const productVideo = (<img style={{ width: '480px', height: '480px' }} src={item.imageUrl} alt={item.productName} />);

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
          <img src={clonedItem.imageUrl} alt={clonedItem.productName} />
        </>
      );
    } else if (type_id === 2) {
      productPictureInfo = (
        <>
          <img style={{ width: '480px', height: '480px' }} src={clonedItem.imageUrl} alt={clonedItem.productName} />
        </>
      );
    } else if (type_id === 3) {
      productPictureInfo = (
        <>
          <img style={{ width: '240px', height: '320px', display: 'block', margin: '0 auto' }} src={clonedItem.imageUrl} alt={clonedItem.productName} />
        </>
      );
    } else if (type_id === 4) {
      productPictureInfo = (
        <>
          <img style={{ width: '480px', height: '480px' }} src={clonedItem.imageUrl} alt={clonedItem.productName} />
        </>
      );
    }
    return productPictureInfo;
  };

  return (
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      {/* {isLoading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : ( */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.productName}</h5>
                  {/* {productBooks}
                  {productImage}
                  {productMusic}
                  {productVideo} */}
                  {productPicture(item)}
                  {/* <img src={item.imageUrl} alt={item.productName} /> */}
                  <div className="d-flex align-items-center mt-2">
                    <input type="button" className="btn btn-sm btn-secondary me-2" value="-" onClick={() => modifyCart(item.product_id, item.quantity - 1)} disabled={isLoading} />
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <input type="button" className="btn btn-sm btn-secondary ms-2" value="+" onClick={() => modifyCart(item.product_id, item.quantity + 1)} disabled={isLoading} />
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => deleteCartItem(item.product_id)} disabled={isLoading}>Delete</button>
                  </div>
                </div>
                {item.discount === parseFloat(0) ? (
                  <>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <span>${(item.price * (1 - item.discount) * item.quantity).toFixed(2)}</span>
                  </>
                )}
                {/* <span>${(item.price * item.quantity).toFixed(2)}</span> */}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-3 text-end">
        <h4>Total: ${getCartTotal().toFixed(2)}</h4>
        {/* <h4>Total: ${getCartTotal()}</h4> */}
        <button className="btn btn-primary mt-2 mr-2 my-2" onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </button>
        {/* <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button> */}
      </div>
    </div>
  );
};

export default ShoppingCart;
