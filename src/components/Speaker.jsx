import React from 'react';
import pst from '../assets/pst.jpeg';
import idCas from '../assets/idcas.png';

export default function Speaker() {
  return (
    <div className="lg:px-40 px-3 mt-22 py-3 flex  justify-center gap-8 items-center flex-col">
      <h3 className="text-3xl font-bold font-inter text-[#0b2241]">Speakers</h3>
      <div className="flex flex-col h-full md:flex-row justify-center gap-5 w-full">
        <div className="w-full flex flex-col gap-4 rounded-2xl h-[400px] md:w-[400px] bg-white shadow-2xl">
          <img
            src={pst}
            alt=""
            className="rounded-t-2xl h-[80%] object-cover object-left-top w-full md:w-[400px]"
          />
          <h3 className="text-[#0b2241] text-center font-bold text-2xl font-inter">
            Femi Olajubu Esq
          </h3>
        </div>
        <div className="w-full flex flex-col gap-4 rounded-2xl h-[400px] md:w-[400px] bg-white shadow-2xl">
          <img
            src={idCas}
            alt=""
            className="rounded-t-2xl h-[80%] object-cover object-left-top w-full md:w-[400px]"
          />
          <h3 className="text-[#0b2241] text-center font-bold text-2xl font-inter">
            Olumide Ogunade (ID Cabasa)
          </h3>{' '}
        </div>
      </div>
    </div>
  );
}
