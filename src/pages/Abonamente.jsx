function Abonamente() {
  return (
    <div>
      <h1 className="text-4xl font-bold flex justify-center items-center mb-3 mt-0.5">
        Abonamente
      </h1>

      <div className="w-full py-10 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-[#3A3A3A] border-2 border-gray-600 shadow-xl rounded-lg flex flex-col h-full p-4 my-4 hover:border-gray-400 hover:scale-105 duration-300">

            <h2 className="text-xl font-semibold text-center">Abonament Simplu</h2>
            <p className="text-center text-4xl font-bold">100 Ron / lună</p>

            <div className="text-center font-medium mt-8">
              <p className="py-2 border-b mx-8">Acces sală (cardio + greutăți)</p>
              <p className="py-2 border-b mx-8">Fără acces la fitness</p>
              <p className="py-2 border-b mx-8">Fără acces la saună</p>
              <p className="py-2 border-b mx-8">Orar: 08:00‑16:00</p>
            </div>

            <button className="mt-auto bg-green-600 w-[200px] rounded-md font-medium px-6 py-3 mx-auto">
              Alege
            </button>
          </div>
          <div className="bg-[#3A3A3A] border-2 border-gray-600 shadow-xl rounded-lg
                          flex flex-col h-full p-4 my-4 hover:border-gray-400 hover:scale-105 duration-300">

            <h2 className="text-xl font-semibold text-center">Abonament VIP</h2>
            <p className="text-center text-4xl font-bold">150 Ron / lună</p>

            <div className="text-center font-medium mt-8">
              <p className="py-2 border-b mx-8">Acces complet sală</p>
              <p className="py-2 border-b mx-8">Clase fitness + yoga</p>
              <p className="py-2 border-b mx-8">Acces la saună</p>
              <p className="py-2 border-b mx-8">Orar: 04:00‑23:00</p>
            </div>

            <button className="mt-auto bg-green-600 w-[200px] rounded-md font-medium px-6 py-3 mx-auto">
              Alege
            </button>
          </div>

          <div className="bg-[#3A3A3A] border-2 border-gray-600 shadow-xl rounded-lg flex flex-col h-full p-4 my-4 hover:border-gray-400 hover:scale-105 duration-300">

            <h2 className="text-xl font-semibold text-center">Abonament Premium</h2>
            <p className="text-center text-4xl font-bold">200 Ron / lună</p>
            <div className="text-center font-medium mt-8">
              <p className="py-2 border-b mx-8">Acces complet sală</p>
              <p className="py-2 border-b mx-8">Clase fitness + yoga</p>
              <p className="py-2 border-b mx-8">Acces saună & dușuri premium</p>
              <p className="py-2 border-b mx-8">Orar: 24/7</p>
            </div>

            <button className="mt-auto bg-green-600 w-[200px] rounded-md font-medium px-6 py-3 mx-auto"> 
              Alege
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Abonamente;