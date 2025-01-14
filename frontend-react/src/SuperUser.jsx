import React from 'react';
import { useLoginSuperUser } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
// import { useLocation } from 'wouter';

function SuperUser() {

  const { showMessage } = useFlashMessage();

  const { getLoginSuperUser } = useLoginSuperUser();
  const loginSuperUser = getLoginSuperUser();

//   console.log('SuperUser Login: ', loginSuperUser);
//   showMessage('SuperUser Login!', 'info');

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shop Management</h1>
    </div>
    </>
  );
}

export default SuperUser;
