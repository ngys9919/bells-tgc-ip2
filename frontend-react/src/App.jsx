import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import ProductsPopularPage from './ProductPopularPage';
import ProductsNewArrivalsPage from './ProductNewArrivalsPage';
import ItemPage from './ItemPage';
import MusicProductPage from './MusicProductPage';
import VideoProductPage from './VideoProductPage';
import SearchPage from './SearchPage';
import RegisterPage from './RegisterPage';
import ShoppingCart from './ShoppingCart';
import SuperUser from './SuperUser';
import { Route, Switch } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
// make sure to import `UserLogin.jsx` after the other imports
import UserLogin from "./UserLogin";
import UserLogout from "./UserLogout";

// Core theme CSS (includes Bootstrap)
import './startbootstrap.css';
// our own style sheet
import './styles.css';
// import './App.css'


function App() {

  const { getMessage, clearMessage  } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {

    const timer = setTimeout(() => {
      clearMessage();
    }
    , 3000);
    return () => {
      clearTimeout(timer);
    };
  }
  , [flashMessage]);

  return (
    <>
      {/* Navbar (not shown) */}
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/productsPopular" component={ProductsPopularPage} />
        <Route path="/productsNewArrivals" component={ProductsNewArrivalsPage} />
        <Route path="/items" component={ItemPage} />
        <Route path="/productsmusic" component={MusicProductPage} />
        <Route path="/productsvideo" component={VideoProductPage} />
        <Route path="/productssearch" component={SearchPage} />
        <Route path="/admin" component={SuperUser} />
        {/* <Route path="http://localhost:3000/api/admin/" component={SuperUser} /> */}  // wont work
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={UserLogin} />
        <Route path="/logout" component={UserLogout} />
        <Route path="/cart" component={ShoppingCart} />
      </Switch>

      {/* <div className="spacer"></div> */}
      <div style={{ margin: '10px 10px', padding: '10px 10px' }}></div>

      {/* Footer */}
      <footer className="py-5 bg-dark">
    <div className="container"><p className="m-0 text-center text-white">Copyright &copy; AI-eShop 2024</p></div>
</footer>
    </>
  );
}

export default App;
