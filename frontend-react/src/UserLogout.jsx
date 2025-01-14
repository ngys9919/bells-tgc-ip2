import React from 'react';
import { useLoginUsername, usePreviousLoginUser } from './UserStore';
import { useCart } from './CartStore';

function UserLogout() {

    const { resetCartContent } = useCart();

    const { setLoginUsername } = useLoginUsername();

    const { getPreviousLoginUser } = usePreviousLoginUser();

    const previousLoginUser = getPreviousLoginUser();

    const y = document.getElementById("loginlogout");
    if (y)
        y.innerHTML = "Login";

    const z = document.getElementById("superuser");
    if (z)
        z.innerHTML = "";

    return (
        <>
        <div className="container mt-5">
            <h2>Logout</h2>
        </div>
            <header className="bg-primary text-white text-center py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <h1 className="display-4">Bye, {previousLoginUser}! <br></br> Thank you for visiting e-BookStore</h1>
                    <a href="/login" className="btn btn-light btn-lg">Re-login again!</a>
                    {setLoginUsername("Guest")}
                    {resetCartContent([])}
                </div>
            </header>
        </>
  );
}

export default UserLogout;
