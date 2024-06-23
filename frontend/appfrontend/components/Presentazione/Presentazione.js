import Image from 'next/image';

const Presentazione = () => {
  return (
    <div className="relative h-screen w-full flex items-end justify-start text-2xl top-10">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/background_logo.jpg" 
          alt="Background Image" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
        />
      </div>
      <div className="relative z-10 bg-black bg-opacity-80 shadow-2xl py-6 px-10 ml-16 mb-32 rounded-br-2xl rounded-tl-2xl font-serif text-center text-white">
        <p>Il nostro salone di bellezza vanta anni di esperienza nel settore dei trattamenti per capelli</p>
        <p>e si impegna costantemente ad offrire ai propri clienti</p>
        <p>un'esperienza di bellezza dedicata interamente alle loro esigenze.</p>
      </div>
    </div>
  );
}

export default Presentazione;