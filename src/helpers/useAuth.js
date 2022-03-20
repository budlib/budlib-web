import React from 'react';

const authContext = React.createContext();

export function useAuth() {
  return {
    login() {
      return new Promise((res) => {
        localStorage.setItem('Authenticated', '1');
        res();
      });
    },

    logout() {
      return new Promise((res) => {
        localStorage.setItem('Authenticated', '0');
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
