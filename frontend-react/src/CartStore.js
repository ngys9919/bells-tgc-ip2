import { atom, useAtom } from 'jotai';
import axios from 'axios';
// after all the imports
import Immutable from "seamless-immutable";
import { useEffect } from "react";
import { useJwt } from "./UserStore";
import { useFlashMessage } from './FlashMessageStore';

// Define the initial state of the cart. We put in one piece of test data
// const initialCart = Immutable([
// {
//     "id": 1,
//     "product_id": 1,
//     "quantity": 10,
//     "productName": "Organic Green Tea",
//     "price": 12.99,
//     "imageUrl": "https://picsum.photos/id/225/300/200",
//     "description": "Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
//   },
// ]);

// Define the initial state of the cart.
const initialCart = Immutable([
  // testing data removed
]);

// const initialCart = Immutable([]);

// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

// Custom hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const { getJwt } = useJwt();

  const { showMessage } = useFlashMessage();

  const updateCart = async () => {
      const jwt = getJwt();
      setIsLoading(true);
      try {
          const updatedCartItems = cart.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
          }));
          await axios.put(
              `${import.meta.env.VITE_API_URL}/api/cart`,
              { cartItems: updatedCartItems },
              {
                  headers: {
                      Authorization: `Bearer ${jwt}`,
                  },
              }
          );
      } catch (error) {
          console.error("Error updating cart:", error);
      } finally {
          setIsLoading(false);
      }
  };

  // Update cart on the backend whenever the cart changes
  useEffect(() => {
      if (cart !== initialCart) {
          updateCart();
      }
  }, [cart]); // Depend on the cart state

  // const modifyCart = (product_id, quantity) => {
  //     setCart((currentCart) => {
  //         const existingItemIndex = currentCart.findIndex((item) => item.product_id === product_id);
  //         if (existingItemIndex !== -1) {

  //             if (quantity >= 1) {
  //               return currentCart.setIn([existingItemIndex, "quantity"], quantity);
  //             } else {
  //               return currentCart.filter((item) => item.product_id !== product_id);
  //             }
  //         }
  //         return currentCart;
  //     });
  // };

  // const modifyQuantity = (product_id, quantity) => {
  const modifyCart = (product_id, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);
      if (existingItemIndex !== -1) {

        // check if the quantity will be reduced to 0 or less, if so remove the item
        if (quantity < 0) {
          return currentCart.filter(item => item.product_id !== product_id);
        } else {                      
            return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
        }

      }
    });
  }

  // const addToCart = (product) => {
  //     setCart((currentCart) => {
  //       const existingItemIndex = currentCart.findIndex((item) => item.product_id === product.id);
  //       if (existingItemIndex !== -1) {
  //         return currentCart.setIn([existingItemIndex, "quantity"], currentCart[existingItemIndex].quantity + 1);
  //       } else {
  //         const newCartItem = {
  //           ...product,
  //           product_id: product.id,
  //           id: Math.floor(Math.random() * 10000 + 1),
  //           quantity: 1,
  //         };
  //         return currentCart.concat(newCartItem);
  //       }
  //     });
  // };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product.id);
      if (existingItemIndex !== -1) {
        // Use setIn to update quantity immutably
        const currentQuantity = currentCart[existingItemIndex].quantity;
        return currentCart.setIn([existingItemIndex, 'quantity'], currentQuantity + 1);
      } else {
        // Use concat to add a new item immutably
        return currentCart.concat({ ...product, product_id: product.id, quantity: 1 });
      }
    });
  };

  // const deleteCartItem = (product_id) => {
  //     setCart((currentCart) =>
  //         currentCart.filter((item) => item.product_id !== product_id)
  //     );
  // };

  // const removeFromCart = (product_id) => {
  const deleteCartItem = (product_id) => {
    setCart((currentCart) => {
      return currentCart.filter(item => item.product_id !== product_id);
    });
  }
  const fetchCart = async () => {
      const jwt = getJwt();
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        // const response = await axios.get('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setCart(Immutable(response.data));
        // console.log('Cart:', response.data);
        // setCartContent(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        showMessage('Error fetching cart!', 'error');
      } finally {
        setIsLoading(false);
      }
  };

 
  // const getCartTotal = () =>
      // cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to calculate the total price of items in the cart
  const getCartTotal = () => {
    let current = 0; 
    let reducer = function(total, item) {
      const price = item.price;
      const discount = item.price * (1 - item.discount);
      if (discount === price) {
        current = item.price * item.quantity;
      } else {
        current = item.price * (1 - item.discount) * item.quantity;
      }
      return current + total;
    }
    let sum = cart.reduce(reducer, 0);
    // console.log(sum);

    return sum;
    // return sum.toFixed(2);
    // return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getCart = () => cart;

  // const setCartContent = (cartItems) => {
  //   setCart(Immutable(cartItems));
  // }

  const resetCartContent = () => {
    setCart(Immutable(initialCart));
  }

  const addQuantityToCart = (product, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product.id);
      const newQuantity = quantity;
      if (existingItemIndex !== -1) {
        // Use setIn to update quantity immutably
        return currentCart.setIn([existingItemIndex, 'quantity'], newQuantity);
      } else {
        // Use concat to add a new item immutably
        return currentCart.concat({ ...product, product_id: product.id, quantity: newQuantity });
      }
    });
  };

  return {
      getCart,
      getCartTotal,
      addToCart,
      modifyCart,
      // modifyQuantity,
      deleteCartItem,
      // removeFromCart,
      fetchCart,
      isLoading,
      // setCartContent,
      resetCartContent,
      addQuantityToCart
  };
};

