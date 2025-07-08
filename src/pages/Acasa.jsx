import React from 'react';
import { Link } from 'react-router-dom';

function Acasa() {
  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="hero-section bg-gradient-to-r from-green-400 to-green-950 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            Bine ai venit la <span className="text-green-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">GymGrig</span>
          </h1>
          <p className="text-2xl mb-8 text-green-100">
            Transforma-ti viata cu cea mai moderna sala de fitness din oras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/abonamente">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
                Alege Abonamentul
              </button>
            </Link>
            <Link to="/despre">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-green-600 transition-colors">
                Afla Mai Mult
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-500 mb-6">
            De Ce Sa Alegi GymGrig?
          </h2>
          <p className="text-xl text-gray-300">
            Descopera toate avantajele care te asteapta
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#3A3A3A] p-8 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Echipamente Premium</h3>
            <p className="text-gray-300">
              Aparate de ultima generatie pentru toate tipurile de antrenament - cardio, greutati si functional training
            </p>
          </div>

          <div className="bg-[#3A3A3A] p-8 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Instructori Experti</h3>
            <p className="text-gray-300">
              Echipa noastra de antrenori certificati te va ghida si motiva sa iti atingi obiectivele
            </p>
          </div>

          <div className="bg-[#3A3A3A] p-8 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Program Flexibil</h3>
            <p className="text-gray-300">
              Acces 24/7 pentru membrii Premium - antreneaza-te cand iti convine, fara restrictii
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-green-500 mb-6">
              Incepe Transformarea Astazi
            </h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Nu mai astepta - fiecare zi este o oportunitate de a deveni mai puternic, mai sanatos si mai increzator.
              La GymGrig ai tot ce iti trebuie pentru a-ti atinge obiectivele.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Acces la toate echipamentele
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Clase de grup incluse
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Consultanta gratuita cu instructorul
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-3">✓</span>
                Facilitati premium (sauna, piscina)
              </li>
            </ul>
          </div>
          <div className="bg-[#3A3A3A] p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">
              Statisticile Noastre
            </h3>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">1000+</div>
                <p className="text-gray-300">Membri Fericiti</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">500m²</div>
                <p className="text-gray-300">Spatiu Modern</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">50+</div>
                <p className="text-gray-300">Aparate Premium</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <p className="text-gray-300">Acces Non-Stop</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Primul Antrenament Este Gratuit!
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Vino sa testezi facilitatile noastre si sa vezi de ce suntem alegerea numarul 1
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
                Programeaza-te Acum
              </button>
            </Link>
            <Link to="/galerie">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-green-600 transition-colors">
                Vezi Galeria
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acasa;