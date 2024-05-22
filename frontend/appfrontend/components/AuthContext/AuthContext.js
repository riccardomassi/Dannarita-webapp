'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import Popup from '@/components/Popup/Popup';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const router = useRouter();

  const fetchUser = () => {
    axiosInstance.get('user/')
      .then(response => {
        if (response.status === 200) {
          setIsSuperuser(response.data.user['is_superuser']);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onClose = () => {
    router.push('/Login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSuperuser }}>
      {isLoggedIn ? children : <Popup message="Devi eseguire il LOGIN prima!" onClose={onClose} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
