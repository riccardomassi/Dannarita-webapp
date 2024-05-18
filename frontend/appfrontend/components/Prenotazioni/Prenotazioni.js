'use client'
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

const Prenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);

  const fetchPrenotazioni = () => {
    axiosInstance.get('reservation/products/')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Errore durante la chiamata API:', error);
    });
  };

  useEffect(() => {
    fetchPrenotazioni();
  }, []);

  return (
    <div className="h-screen w-full text-black bg-amber-50 flex items-center justify-center text-2xl">
      <Sidebar />
      Prenotazioni
    </div>
  );
}

export default Prenotazioni;