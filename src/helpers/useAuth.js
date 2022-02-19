import React, { useState } from 'react';

const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = useState("yes");

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(1);

        localStorage.setItem('Auth', 1);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(1);
        localStorage.setItem('Auth', 0);
        res();
      });
    },
  };
}


export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}