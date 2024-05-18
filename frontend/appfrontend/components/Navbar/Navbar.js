'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, AccountCircle, ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuElement, setMenuElement] = useState(0);
	const [user, setUser] = useState(null);
	const [update, setUpdate] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleMenuElement = (element) => {
		setMenuElement(element);
		localStorage.setItem("menuElement", element);
		setIsMenuOpen(false);
	}

	const toggleUpdate = () => {
		setUpdate(!update);
	}

	useEffect(() => {
		if (!localStorage.getItem("menuElement")) {
			localStorage.setItem("menuElement", 0);
		}
		const savedMenuElement = localStorage.getItem("menuElement");
		if (savedMenuElement) {
			setMenuElement(parseInt(savedMenuElement));

		}
	}, []);

	const fetchUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/products/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.ok) {
				setUser(true);
      } else {
				setUser(false);
      }

    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [toggleUpdate]);

	return (
		<nav className="bg-white border-gray-200 shadow-2xl fixed top-0 w-full z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-10 text-xl">
				<div className="flex flex-row items-center">
					<Link href="/" onClick={() => toggleMenuElement(0)} className="flex items-center space-x-3 rtl:space-x-reverse mr-10">
						<Image src="/dannarita-logo.jpeg" height={100} width={100} alt="Dannarita Logo" />
					</Link>
					<Link onClick={toggleUpdate} href={`${user === true ? "/Prenotazioni" : "/Register"}`} className="text-black text-lg">
						<div className="flex items-center">
							<AccountCircle />
							User
						</div>
					</Link>
				</div>
				<button onClick={toggleMenu} className="lg:hidden text-black">
					<Menu />
				</button>
				<div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
					<ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border rounded-lg bg-gray-100 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white">
						<li>
							<Link href="/" onClick={() => toggleMenuElement(0)}
								className={`${menuElement === 0 ? 'lg:font-bold lg:text-orange-800 bg-amber-950 rounded text-white' : 'text-gray-900 hover:bg-gray-200 lg:hover:bg-transparent'} block py-2 px-3 lg:bg-transparent lg:hover:font-bold lg:hover:text-orange-800 lg:p-0`}
							>
								Home
							</Link>
						</li>
						<li>
							<Link href="/Acconciature" onClick={() => toggleMenuElement(1)}
								className={`${menuElement === 1 ? 'lg:font-bold lg:text-orange-800 bg-amber-950 rounded text-white' : 'text-gray-900 hover:bg-gray-200 lg:hover:bg-transparent'} block py-2 px-3 lg:bg-transparent lg:hover:font-bold lg:hover:text-orange-800 lg:p-0`}
							>
								Acconciature
							</Link>
						</li>
						<li>
							<Link href="/Prodotti" onClick={() => toggleMenuElement(2)}
								className={`${menuElement === 2 ? 'lg:font-bold lg:text-orange-800 bg-amber-950 rounded text-white' : 'text-gray-900 hover:bg-gray-200 lg:hover:bg-transparent'} block py-2 px-3 lg:bg-transparent lg:hover:font-bold lg:hover:text-orange-800 lg:p-0`}
							>
								Prodotti
							</Link>
						</li>
						<li>
							<Link href="/Contatti" onClick={() => toggleMenuElement(3)}
								className={`${menuElement === 3 ? 'lg:font-bold lg:text-orange-800 bg-amber-950 rounded text-white' : 'text-gray-900 hover:bg-gray-200 lg:hover:bg-transparent'} block py-2 px-3 lg:bg-transparent lg:hover:font-bold lg:hover:text-orange-800 lg:p-0`}
							>
								Contatti
							</Link>
						</li>
						<li>
							<Link href="/Carrello" onClick={() => toggleMenuElement(4)}
								className={`${menuElement === 4 ? 'lg:font-bold lg:text-orange-800 bg-amber-950 rounded text-white' : 'text-gray-900 hover:bg-gray-200 lg:hover:bg-transparent'} block py-2 px-3 lg:bg-transparent lg:hover:font-bold lg:hover:text-orange-800 lg:p-0`}
							>
								<ShoppingCart />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;