import { atom, useAtom } from 'jotai';

const jwtAtom = atom(null);

// const usernameAtom = atom(null);
const usernameAtom = atom("Guest");
const previousUserAtom = atom(null);
// const previousUserAtom = atom("Guest");
const loginSuperUserAtom = atom("false");

export function useLoginUsername() {
  const [loginUsername, setLoginUsernameAtom] = useAtom(usernameAtom);

  const setCurrentLoginUsername = (newLoginUsername) => {
    setLoginUsernameAtom(newLoginUsername);
  };

  const storeLoginUsername = (newLoginUsername) => {
    localStorage.setItem('loginUser', newLoginUsername);
  };

  const setLoginUsername = (newLoginUsername) => {
    localStorage.setItem('loginUser', newLoginUsername);
    setLoginUsernameAtom(newLoginUsername);
  };

  const getLoginUsername = () => {
    
    // This is with memory
    // const storedLoginUsername = localStorage.getItem('loginUser') || 'Guest';
    // return storedLoginUsername;

    // This is without memory
    const storedLoginUsername = localStorage.getItem('loginUser');

    // This is for loginUsername = null by default 
    if (storedLoginUsername && !loginUsername) {
      setLoginUsernameAtom(storedLoginUsername);
    }
    return loginUsername || storedLoginUsername;

    // const storedLoginUsername = localStorage.getItem('loginUser');
    // setLoginUsernameAtom(storedLoginUsername);
    // return storedLoginUsername;
  };

  const getCurrentLoginUsername = () => {
    // console.log(loginUsername);
    return loginUsername;
  };

  return { loginUsername, setLoginUsername, getLoginUsername, setCurrentLoginUsername, storeLoginUsername, getCurrentLoginUsername };
  // return { loginUsername, setLoginUsername, setDefaultLoginUsername, getCurrentLoginUsername };
}

export function usePreviousLoginUser() {
  const [previousLoginUser, setPreviousLoginUserAtom] = useAtom(previousUserAtom);

  const getPreviousLoginUser = () => {   
    const previousLoginUser = localStorage.getItem('previousUser');
    return previousLoginUser;
  };

  const setPreviousLoginUser = (newLoginUsername) => {
    localStorage.setItem('previousUser', newLoginUsername);
    setPreviousLoginUserAtom(newLoginUsername);
  };

  return { previousLoginUser, getPreviousLoginUser, setPreviousLoginUser };
}

export function useLoginSuperUser() {
  const [loginSuperUser, setLoginSuperUserAtom] = useAtom(loginSuperUserAtom);

  const getLoginSuperUser = () => {   
    // const loginSuperUser = localStorage.getItem('SuperUser');
    return loginSuperUser;
  };

  const setLoginSuperUser = () => {
    // localStorage.setItem('SuperUser', "true");
    setLoginSuperUserAtom("true");
  };

  const resetLoginSuperUser = () => {
    localStorage.setItem('SuperUser', "false");
    setLoginSuperUserAtom("false");
  };

  return { loginSuperUser, getLoginSuperUser, setLoginSuperUser, resetLoginSuperUser };
}

export function useJwt() {
  const [jwt, setJwtAtom] = useAtom(jwtAtom);

  const setJwt = (newJwt) => {
    localStorage.setItem('jwt', newJwt);
    setJwtAtom(newJwt);
  };

  const getJwt = () => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt && !jwt) {
      setJwtAtom(storedJwt);
    }
    return jwt || storedJwt;
  };

  const clearJwt = () => {
    localStorage.removeItem('jwt');
    setJwtAtom(null);
  };

  return { jwt, setJwt, getJwt, clearJwt };
}
