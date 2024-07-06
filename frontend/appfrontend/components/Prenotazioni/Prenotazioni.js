'use client'
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import dayjs from "dayjs";
import { useAuth } from "../AuthContext/AuthContext";
import Popup from "../Popup/Popup";

const Prenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [showPopupConferma, setShowPopupConferma] = useState(false);
  const [showPopupEliminato, setShowPopupEliminato] = useState(false);
  const [idPrenotazione, setIdPrenotazione] = useState(null);
  const [message, setMessage] = useState('');
  const { isSuperuser } = useAuth();
  // Raggruppare le prenotazioni per utente_nome
  const groupedPrenotazioni = prenotazioni.reduce((acc, prenotazione) => {
    const utenteNome = prenotazione.utente_nome;
    if (!acc[utenteNome]) {
      acc[utenteNome] = [];
    }
    acc[utenteNome].push(prenotazione);
    return acc;
  }, {});

  const formatData = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const fetchPrenotazioni = () => {
    axiosInstance.get('reservation/products/')
      .then(response => {
        setPrenotazioni(response.data);
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  useEffect(() => {
    fetchPrenotazioni();
  }, []);

  const eliminaPrenotazione = (id_prenotazione) => {
    setShowPopupConferma(true);
    setMessage(`Sicuro di voler eliminare la prenotazione ${id_prenotazione}?`);
    setIdPrenotazione(id_prenotazione);
  }

  const handleConfermaELiminaPrenotazione = () => {
    axiosInstance.delete(`reservation/delete/${idPrenotazione}/`)
      .then(response => {
        if (response.status === 204) {
          setShowPopupEliminato(true);
          setShowPopupConferma(false);
          setMessage('Prenotazione eliminata con successo!');
          fetchPrenotazioni();
        }
      }
      )
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  const onCloseConferma = () => {
    setShowPopupConferma(false);
  };
  const onCloseEliminato = () => {
    setShowPopupEliminato(false);
  };

  return (
    <div className="h-screen w-full flex justify-center overflow-y-auto bg-amber-50 pt-28 text-black text-2xl">
      <div className="ml-72">
        <div className="grid grid-cols-1 gap-8">
          {prenotazioni.length === 0 ? (
            <div className="font-bold text-2xl">Nessuna Prenotazione</div>
          ) : (
            Object.keys(groupedPrenotazioni).map((utenteNome) => (
              <div key={utenteNome}>
                {isSuperuser && (
                  <div className="font-bold text-2xl mb-4">Utente: {utenteNome}</div>
                )}
                {groupedPrenotazioni[utenteNome].map((prenotazione) => (
                  <div key={prenotazione.id_prenotazione} className="border p-4 rounded-lg mb-4">
                    <div className="font-bold">Prenotazione {prenotazione.id_prenotazione}</div>
                    <div className="mt-2">Data Prenotazione: {formatData(prenotazione.data_prenotazione)}</div>
                    <ul className="mt-4">
                      {prenotazione.prodotti.map((prodotto) => (
                        <li key={prodotto.prodotto.id} className="mb-2">
                          <div className="font-semibold">{prodotto.prodotto.name}</div>
                          <div className="text-gray-600">Prezzo: {prodotto.prodotto.price} €</div>
                          <div className="text-gray-600">Quantità: {prodotto.quantita}</div>
                        </li>
                      ))}
                    </ul>
                    {isSuperuser && (
                      <button
                        onClick={() => eliminaPrenotazione(prenotazione.id_prenotazione)}
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                      >
                        Elimina
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Mostra POPUP per conferma eliminazione */
        showPopupConferma && (
          <Popup message={message} onClose={onCloseConferma} showConferma={true} handleConferma={handleConfermaELiminaPrenotazione} />
        )}
      {/* Mostra POPUP per avvenuta eliminazione */
        showPopupEliminato && (
          <Popup message={message} onClose={onCloseEliminato} />
        )}
    </div>
  );
};

export default Prenotazioni;