const Servizi = () => {
  return (
    <div className="w-full text-black bg-amber-50 pt-16">
      <h2 className="flex justify-center font-thin text-4xl mb-2">Servizi, Prodotti e Acconciature per Uomo e Donna</h2>
      <div className="flex items-center justify-evenly mt-10 mb-10 font-bold text-xl">
        <div>
          <ul className="list-disc ml-4 space-y-3">
            <li>Taglio uomo, donna e bimbo</li>
            <li>Colore</li>
            <li>Colpi di luce</li>
            <li>Painting / Blaiage</li>
            <li>Luci e ombre</li>
            <li>Pigmenti</li>
          </ul>
        </div>
        <div>
          <ul className="list-disc ml-4 space-y-3">
            <li>Permanente</li>
            <li>Stiratura</li>
            <li>Stiratura Keratina</li>
            <li>Trattamento Anticrespo Keratina</li>
            <li>Hair Botox Keratina</li>
            <li>Hair Touch Evolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Servizi;