'use client'
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";

const CheckAuth = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  const fetchUser = () => {
    axiosInstance.get('user/')
      .then(response => {
        if (response.status === 200) {
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
    <div>
      {isloggedIn ? children : <Popup message="Devi eseguire il LOGIN prima!" onClose={onClose}/>}
    </div>
  );
}

export default CheckAuth;