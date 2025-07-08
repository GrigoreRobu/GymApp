import React from 'react';

function Despre() {
  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-600 mb-6">Despre GymGrig</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Cea mai moderna si completa sala de fitness din oras, dedicata sa iti transforme stilul de viata
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-6">Povestea Noastra</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              GymGrig a fost infiintata in 2020 cu o misiune clara: sa oferim un spatiu modern,
              prietenos si motivant pentru toti cei care isi doresc sa isi imbunatateasca forma fizica
              si sa adopte un stil de viata sanatos.
            </p>
            <p className="text-gray-300 leading-relaxed">
              In doar cativa ani, am devenit punctul de referinta pentru fitness in comunitatea noastra,
              ajutand peste 1000 de membri sa isi atinga obiectivele de sanatate si fitness.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-6">Misiunea Noastra</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Credem ca fiecare persoana merita sa se simta puternica, sanatoasa si increzatoare.
              Misiunea noastra este sa oferim instrumentele, spatiul si suportul necesar pentru
              ca fiecare membru sa isi atinga potentialul maxim.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nu suntem doar o sala de sport - suntem o comunitate care se sustine reciproc
              in calatoria catre o viata mai sanatoasa.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-12">
            De Ce Sa Alegi GymGrig?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-green-400 mb-3">Echipamente Premium</h3>
              <p className="text-gray-300 text-sm">
                Aparate de ultima generatie pentru cardio, greutati si antrenamente functionale
              </p>
            </div>

            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">

              <h3 className="text-xl font-bold text-green-400 mb-3">Instructori Profesionisti</h3>
              <p className="text-gray-300 text-sm">
                Echipa noastra de antrenori certificati te va ghida in fiecare pas
              </p>
            </div>

            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">

              <h3 className="text-xl font-bold text-green-400 mb-3">Program Flexibil</h3>
              <p className="text-gray-300 text-sm">
                Deschis 24/7 pentru Premium, astfel incat sa te antrenezi cand iti convine
              </p>
            </div>

            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">

              <h3 className="text-xl font-bold text-green-400 mb-3">Clase Diversificate</h3>
              <p className="text-gray-300 text-sm">
                Yoga, Pilates, Zumba, CrossFit si multe alte clase pentru toate nivelurile
              </p>
            </div>

            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">

              <h3 className="text-xl font-bold text-green-400 mb-3">Facilitati Complete</h3>
              <p className="text-gray-300 text-sm">
                Sauna, dusuri premium, vestiare spatioase si zone de relaxare
              </p>
            </div>

            <div className="bg-[#3A3A3A] p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300">

              <h3 className="text-xl font-bold text-green-400 mb-3">Comunitate Puternica</h3>
              <p className="text-gray-300 text-sm">
                Alatura-te unei comunitati motivante care te va sustine in fiecare zi
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#3A3A3A] rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-8">
            GymGrig in Cifre
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1000+</div>
              <p className="text-gray-300">Membri Activi</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500m²</div>
              <p className="text-gray-300">Spatiu de Antrenament</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <p className="text-gray-300">Aparate Moderne</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">4</div>
              <p className="text-gray-300">Ani de Experienta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Despre;