import {
  LocationOn, MapRounded, Diversity1Rounded, Facebook, Instagram, AccessTimeRounded, Phone
} from "@mui/icons-material";
import Link from "next/link";

const Contatti = () => {
  return (
    <div className="h-screen text-black bg-amber-50 flex flex-col overflow-y-auto">
      {/* Contattaci */}
      <div className="mt-40 text-center">
        <div className="text-3xl font-bold">Contattaci per prendere appuntamento</div>
        <div className="bg-amber-100 rounded-full inline-flex items-center shadow py-3 px-5 mt-4">
          <div className="scale-[1.3] inline-block">
            <Phone />
          </div>
          <span className="text-2xl ml-2">+39 344 193 4048</span>
        </div>
      </div>

      <div className="mt-32 mb-32 flex flex-col lg:flex-row justify-evenly">
        {/* Sede */}
        <div className="flex flex-col items-center">
          <div className="scale-[2] flex flex-row">
            <LocationOn />
            <MapRounded />
          </div>
          <div className="text-xl font-bold mt-8">Dannarita Parrucchieri</div>
          <a className="text-lg">Via Ermanno Gerosa 42</a>
          <a className="text-lg">41122 Modena</a>
        </div>

        {/* Recapiti */}
        <div className="flex flex-col items-center mt-10 lg:mt-0">
          <div className="scale-[2]">
            <Diversity1Rounded />
          </div>
          <Link
            href="https://www.facebook.com/search/top?q=dannarita%20parrucchieri&locale=it_IT"
          >
            <div className="flex items-center mt-8">
              <div className="scale-[1.3]">
                <Facebook />
              </div>
              <div className="text-black text-xl ml-2">Dannarita Parrucchieri</div>
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/dannarita.parrucchieri/"
          >
            <div className="flex items-center mt-2">
              <div className="scale-[1.3]">
                <Instagram />
              </div>
              <div className="text-black text-xl ml-2">dannarita.parrucchieri</div>
            </div>
          </Link>
        </div>

        {/* Orari */}
        <div className="flex flex-col items-center mt-10 lg:mt-0">
          <div className="scale-[2]">
            <AccessTimeRounded />
          </div>
          <div className="text-xl">
            <div className="flex flex-row mt-8">
              <a className="flex justify-start">Lunedì</a>
              <a className="ml-[165px]">Chiuso</a>
            </div>
            <div className="flex flex-row mt-2">
              <a>Mar - Sab</a>
              <a className="ml-20">09:00 - 18:00</a>
            </div>
            <div className="flex flex-row mt-2">
              <a className="flex justify-start">Domenica</a>
              <a className="ml-[135px]">Chiuso</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contatti;