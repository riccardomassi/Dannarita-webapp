'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  const handleLogout = async () => {
    const csrftoken = Cookies.get('csrftoken');
    try {
      const response = await fetch('http://127.0.0.1:8000/products/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        router.push('/Login');
      }
    }
    catch (error) {
      console.error('Errore durante il logout:', error);
    }
  }

  return (
    <div className="relative">
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        } sm:hidden`}
      ></div>
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-amber-100 border-r-2 border-amber-500 shadow">
          <ul className="space-y-2 font-medium mt-32">
            <li>
              <Link href="/Prenotazioni" className="py-2 px-6 rounded-lg hover:bg-amber-200">Prenotazioni</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center mt-6 py-2 px-6 rounded-lg hover:bg-amber-200">
                <AccountCircle />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
