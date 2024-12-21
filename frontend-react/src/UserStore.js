import { atom, useAtom } from 'jotai';

const jwtAtom = atom(null);

// const usernameAtom = atom(null);
const usernameAtom = atom("Guest");
const previousUserAtom = atom(null);

export function useLoginUsername() {
  const [loginUsername, setLoginUsernameAtom] = useAtom(usernameAtom);

  const setLoginUsername = (newLoginUsername) => {
    localStorage.setItem('loginUser', newLoginUsername);
    setLoginUsernameAtom(newLoginUsername);
  };

  const getLoginUsername = () => {
    // This is with memory
    // const storedLoginUsername = localStorage.getItem('loginUsername') || 'Guest';
    // return storedLoginUsername;

    // This is without memory
    const storedLoginUsername = localStorage.getItem('loginUser');
    
    if (storedLoginUsername && !loginUsername) {
      setLoginUsernameAtom(storedLoginUsername);
    }
    return loginUsername || storedLoginUsername;
  };

  return { loginUsername, setLoginUsername, getLoginUsername };
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
