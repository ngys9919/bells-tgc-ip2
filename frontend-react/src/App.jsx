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

import { ToastContainer, cssTransition, toast } from 'react-toastify';

// import 'animate.css/animate.min.css';

import { Trash, BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';

// it just work with any css animation! CSS FTW

// animate.css
const Bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});

function App() {
  const notify1 = () => toast("Wow so easy!");
  // Toast Emitter
  const notifyMessage = () => toast.error(`🦄 ${flashMessage.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

  const notify = () => {
    toast.info('Wow so easy !');
    toast.error('Wow so easy !');
    toast.success('Wow so easy !');
    toast.warning('Wow so easy !');
  };

  const { getMessage, clearMessage } = useFlashMessage();
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

  useEffect(() => {
    if (flashMessage.message)
      notifyMessage();
  }, [flashMessage.message]);

  return (
    <>
      <div>
        {/* <button onClick={notify1}>Notify1!</button> */}
        <ToastContainer />
      </div>

      <div>
        {/* <button onClick={notifyMessage}>Notify2!</button> */}
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </div>

      <div className="grid place-items-center h-dvh bg-zinc-900/15">
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer
        icon={({ type, theme }) => {
          // theme is not used in this example but you could
          switch (type) {
            case 'info':
              return <Info className="stroke-indigo-400" />;
              // return <Trash className="stroke-indigo-400" />;
            case 'error':
              return <CircleAlert className="stroke-red-500" />;
            case 'success':
              return <BadgeCheck className="stroke-green-500" />;
            case 'warning':
              return <TriangleAlert className="stroke-yellow-500" />;
            default:
              return null;
          }
        }}
      />
      </div>

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
