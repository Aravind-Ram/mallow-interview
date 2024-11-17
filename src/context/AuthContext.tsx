import React, { createContext, useContext, useEffect } from 'react';
import { fakeAuthProvider } from '../auth';
import { encryptData } from '../utils/crypto';
import { IAuth } from '../interfaces/IAuth';

const AuthContext = createContext<IAuth.AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);

  const [loading, setLoading] = React.useState<boolean>(true);

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      const authToken = encryptData(newUser);
      localStorage.setItem('authToken', authToken);
      setUser(authToken);
      callback();
    });
  };

  // Check localStorage on app load
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setUser(authToken);
    }
    setLoading(false);
  }, []);

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem('authToken');
      setUser(null);
      callback();
    });
  };

  const value: any = { user, loading, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): IAuth.AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
