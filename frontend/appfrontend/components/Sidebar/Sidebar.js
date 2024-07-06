'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/AuthContext";
import axiosInstance from "@/utils/axiosInstance";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const { isSuperuser } = useAuth();

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    axiosInstance.post('logout/')
      .then(response => {
        if (response.status === 200) {
          router.push('/Login');
        }
      })
      .catch(error => {
        console.error('Errore durante il logout:', error.response.data);
      });
  };

  return (
    <div className="relative text-black text-2xl">
      <div className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform">
        <div className="h-full px-3 py-4 overflow-y-auto bg-amber-100 border-r-2 border-amber-500 shadow">
          <ul className="space-y-2 font-medium mt-32">
            <li>
              <Link href="/Prenotazioni" className="py-2 px-6 rounded-lg hover:bg-amber-200">Prenotazioni</Link>
            </li>
            {isSuperuser && (
              <div>
                <li className="mt-6">
                  <Link href="/Crea" className="py-2 px-6 rounded-lg hover:bg-amber-200">Crea Prodotto</Link>
                </li>
                <li className="mt-6">
                  <Link href="/Modifica" className="py-2 px-6 rounded-lg hover:bg-amber-200">Modifica Prodotto</Link>
                </li>
                <li className="mt-6">
                  <Link href="/Elimina" className="py-2 px-6 rounded-lg hover:bg-amber-200">Elimina Prodotto</Link>
                </li>
              </div>)}
            <li>
              <button onClick={handleLogout} className="flex items-center mt-6 py-2 px-6 rounded-lg hover:bg-amber-200">
                <AccountCircle />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
