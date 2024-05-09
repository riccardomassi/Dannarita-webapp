'use client';
import { useState } from "react";
import Link from "next/link";
import { Menu, LocalPhone } from "@mui/icons-material";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="bg-white border-gray-200 shadow-2xl fixed top-0 w-full z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-xl">	
				<Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="/dannarita-logo.jpeg" className=" h-14 rounded" alt="Dannarita Logo" />
				</Link>
				<button onClick={toggleMenu} className="lg:hidden text-black">
					<Menu />
				</button>
				<div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
					<ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border rounded-lg bg-gray-100 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white">
						<li>
							<Link href="/" className="block py-2 px-3 text-white bg-amber-950 rounded lg:bg-transparent lg:text-black lg:hover:font-bold lg:hover:text-orange-800 lg:focus:font-bold lg:focus:text-orange-800 lg:p-0">Home</Link>
						</li>
						<li>
							<Link href="/Acconciature" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 lg:hover:bg-transparent lg:hover:font-bold lg:border-0 lg:hover:text-orange-800 lg:p-0 lg:focus:text-orange-800">Acconciature</Link>
						</li>
						<li>
							<Link href="/Prodotti" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 lg:hover:bg-transparent lg:hover:font-bold lg:border-0 lg:hover:text-orange-800 lg:p-0">Prodotti</Link>
						</li>
						<li>
							<Link href="/Contatti" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 lg:hover:bg-transparent lg:hover:font-bold lg:border-0 lg:hover:text-orange-800 lg:p-0">Contatti</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;