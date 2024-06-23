import Image from 'next/image';

const Acconciature = () => {
  return (
    <div className="h-screen w-full text-black bg-amber-50 flex flex-col items-center justify-center text-2xl">
      <div className="h-screen">
        <div className="absolute inset-x-0 top-28 mx-20">
          <div className="bg-black bg-opacity-10 py-6 px-10 rounded-br-2xl rounded-tl-2xl font-serif">
            <p>La bellezza dei capelli è la nostra vocazione: il personale altamente qualificato e specializzato in acconciature,</p>
            <p>trattamenti di rigenerazione, tagli e colorazioni, vi accoglierà in un ambiente moderno e rilassante,</p>
            <p>dotato di tecnologie all'avanguardia e di prodotti di elevata qualità.</p>
            <br></br>
            <p>Grazie alla passione e all'attenzione per i dettagli, ci preoccupiamo di offrire un servizio personalizzato,</p>
            <p>in grado di soddisfare le diverse esigenze di ogni cliente.</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Image
          src="/acconciature1.jpg"
          alt="Immagine 1"
          width={450}
          height={200}
          className="rounded-lg"
        />
        <Image
          src="/acconciature2.jpg"
          alt="Immagine 2"
          width={450}
          height={200}
          className="rounded-lg"
        />
        <Image
          src="/acconciature3.jpg"
          alt="Immagine 3"
          width={450}
          height={200}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default Acconciature;