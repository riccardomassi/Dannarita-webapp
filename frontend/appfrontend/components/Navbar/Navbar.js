'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@mui/icons-material";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [menuElement, setMenuElement] = useState(localStorage.getItem("menuElement") || 0);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const savedMenuElement = localStorage.getItem("menuElement");
		if (savedMenuElement) {
			setMenuElement(parseInt(savedMenuElement));
		}
	}, []);

	const toggleMenuElement = (element) => {
		setMenuElement(element);
		localStorage.setItem("menuElement", element);
		setIsMenuOpen(false);
	}

	return (
		<nav className="bg-white border-gray-200 shadow-2xl fixed top-0 w-full z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-10 text-xl">
				<Link href="/" onClick={() => toggleMenuElement(0)} className="flex items-center space-x-3 rtl:space-x-reverse">
					<Image src="/dannarita-logo.jpeg" height={100} width={100} alt="Dannarita Logo" />
				</Link>
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
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;