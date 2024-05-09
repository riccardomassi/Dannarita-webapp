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
				<button onClick={toggleMenu} className="md:hidden text-black">
					<Menu />
				</button>
				<div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
						<li>
							<Link href="/" className="block py-2 px-3 text-white font-bold bg-amber-950 rounded md:bg-transparent md:text-orange-800 md:p-0">Home</Link>
						</li>
						<li>
							<Link href="/Acconciature" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:font-bold md:border-0 md:hover:text-orange-800 md:p-0">Acconciature</Link>
						</li>
						<li>
							<Link href="/Prodotti" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:font-bold md:border-0 md:hover:text-orange-800 md:p-0">Prodotti</Link>
						</li>
						<li>
							<Link href="/Contatti" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:font-bold md:border-0 md:hover:text-orange-800 md:p-0">Contatti</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;