import React, { useState, useEffect } from 'react';
import { useLoginSuperUser } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';
// import { useLocation } from 'wouter';
import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

import avatar from './assets/avatar.png'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const rawHTML2 = `
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
</div>
`


function SuperUser() {

  const [rawHTML, setRawHTML] = useState([]);
  const { showMessage } = useFlashMessage();

  const { getLoginSuperUser } = useLoginSuperUser();
  const loginSuperUser = getLoginSuperUser();

//   console.log('SuperUser Login: ', loginSuperUser);
//   showMessage('SuperUser Login!', 'info');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {

        // const response = await axios.get('/products.json');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin`);
        // const response = await axios.get(`http://localhost:3000/api/admin`);
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/employees`);
        setRawHTML(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching admin:', error);
        showMessage('Error fetching admin!', 'error');
      }
    };
  
    fetchAdmin();
  }, []);

  // const handleUsersProfile = () => {
  //   // Redirect to Backend
  //   // window.location.href = `${import.meta.env.VITE_API_URL}/api/adminshop/main`;
  //   let usersprofileTypeHeader = <></>;
  //   usersprofileTypeHeader = (
  //     <>
  //     <MyComponent1/>
  //     <MyComponent2/>
  //     </>
  //   );
  //   return(usersprofileTypeHeader);
  // };

  // API: Handle Backend
  const handleBackendShop = async () => {
    // Redirect to Backend
    window.location.href = `${import.meta.env.VITE_API_URL}/api/adminshop/main`;
  };

  const handleBackendTalent = async () => {
    // Redirect to Backend
    window.location.href = `${import.meta.env.VITE_API_URL}/api/admintalent/main`;
  };

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Backend Management</h1>
      <div id="logo-div">
   <a href="https://nodejs.org/en" target="_blank">
     <img src="https://img.icons8.com/color/48/nodejs.png" className="logo" alt="node.js logo" />
   </a>
   <a href="https://react.dev" target="_blank">
     <img src={avatar} className="logo react" alt="avatar logo" />
   </a>
   <a href="https://www.mysql.com/" target="_blank">
     <img src="https://img.icons8.com/color/48/mysql-logo.png" className="logo" alt="MySQL logo" />
   </a>
 </div>
      { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
      <div className="text-center">
      <button style={{ margin: '0.5rem', padding: '0.5rem' }} className="btn btn-success mr-2 my-2" onClick={handleBackendShop}>Proceed to Shop Backend</button>
      <button style={{ margin: '0.5rem', padding: '0.5rem' }} className="btn btn-success mr-2 my-2" onClick={handleBackendTalent}>Proceed to Talent Backend</button>
      {/* <button style={{ margin: '0.5rem', padding: '0.5rem' }} className="btn btn-success mr-2 my-2" onClick={handleUsersProfile}>Users Profile</button> */}
      </div>
    </div>
    </>
  );
}

export default SuperUser;
