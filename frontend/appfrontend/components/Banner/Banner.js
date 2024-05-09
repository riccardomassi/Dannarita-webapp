import Link from "next/link";
import Image from "next/image";
import { Facebook } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";

const Banner = () => {
  return (
    <div className="bg-white w-full flex flex-col py-6">
      <div className="flex items-center justify-center">
        <Image src="/dannarita-logo.jpeg" height={100} width={130} alt="Dannarita Logo" />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly text-black text-xl mt-6">
        <div className="flex flex-col items-center">
          <h1 className="font-mono">Sede</h1>
          <a className="font-thin mt-2">Via Ermanno Gerosa 42</a>
          <a className="font-thin">41122 Modena</a>
        </div>
        <div className="flex flex-col items-center mt-8 lg:mt-0 font-thin">
          <h1 className="font-mono">Recapiti</h1>
          <a className="mt-2">+39 344 193 4048</a>
          <Link
            href="https://www.facebook.com/search/top?q=dannarita%20parrucchieri&locale=it_IT"
          >
            <div className="flex items-center mt-2 text-amber-950">
              <Facebook />
              <div className="text-black">Dannarita Parrucchieri</div>
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/dannarita.parrucchieri/"
          >
            <div className="flex items-center mt-2 text-amber-950">
              <Instagram />
              <div className="text-black">dannarita.parrucchieri</div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center mt-8 lg:mt-0">
          <h1 className="font-mono">Orari</h1>
          <div>
            <div className="flex flex-row font-thin mt-2">
              <a className="flex justify-start">Lunedì</a>
              <a className="ml-[165px]">Chiuso</a>
            </div>
            <div className="flex flex-row font-thin mt-2">
              <a>Mar - Sab</a>
              <a className="ml-20">09:00 - 18:00</a>
            </div>
            <div className="flex flex-row font-thin mt-2">
              <a className="flex justify-start">Domenica</a>
              <a className="ml-[135px]">Chiuso</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;