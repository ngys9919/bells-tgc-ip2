import React, { useState, useEffect } from 'react';
import { useLoginSuperUser } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';
// import { useLocation } from 'wouter';
import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

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

  // API: Handle Checkout
  const handleBackend = async () => {
    // Redirect to Backend
    window.location.href = `${import.meta.env.VITE_API_URL}/api/admin/employees`;
  };

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shop Management</h1>
      { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
      <div className="mt-3 text-end">
        <button className="btn btn-primary mt-2 mr-2 my-2" onClick={handleBackend}>Proceed to Backend</button>
      </div>
    </div>
    </>
  );
}

export default SuperUser;
