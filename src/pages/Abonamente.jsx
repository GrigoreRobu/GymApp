import React from 'react';

function Abonamente() {
  return (
    <div>
      <h1 className=' text-4xl flex font-bold justify-center items-center mb-3 mt-0.5'>Abonamente</h1>
      <div className='w-full py-10 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <abonament className='bg-[#3A3A3A] h-full border-2 border-gray-600 w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:border-gray-400  hover:scale-105 duration-300 '>
            <info className=' flex flex-col h-full'>
              <titlu className='flex justify-center'>Abonament Simplu</titlu>
              <p className='text-center text-4xl font-bold'>100 Ron/luna</p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Acces sala(cardio+greutati)</p>
                <p className='py-2 border-b mx-8'>Fara acces la fitness</p>
                <p className='py-2 border-b mx-8'>Fara acces la sauna</p>
                <p className='py-2 border-b mx-8'>Orar: 08:00-16:00</p>
              </div>
              <button className='bg-green-600  w-[200px] rounded-md flex justify-center font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
            </info>
          </abonament>
          <abonament className='flex flex-col h-full bg-[#3A3A3A] border-2 border-gray-600 w-full justify-between shadow-xl p-4 my-4 rounded-lg hover:border-gray-400  hover:scale-105 duration-300 '>
            <info className=''>
              <titlu className='flex justify-center'>Abonament VIP</titlu>
              <p className='text-center text-4xl font-bold'>150 Ron/luna</p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Acces complet sala</p>
                <p className='py-2 border-b mx-8'>Clase de fitness + yoga</p>
                <p className='py-2 border-b mx-8'>Acces la sauna</p>
                <p className='py-2 border-b mx-8'>Orar: 04:00-23:00</p>
              </div>
              <button className='bg-green-600 w-[200px] rounded-md flex justify-center font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
            </info>
          </abonament>
          <abonament className='bg-[#3A3A3A] h-full border-2 border-gray-600 w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:border-gray-400 hover:scale-105 duration-300 '>
            <info className=''>
              <titlu className='flex justify-center'>Abonament Premium</titlu>
              <p className='text-center text-4xl font-bold'>200 Ron/luna</p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Acces complet sala</p>
                <p className='py-2 border-b mx-8'>Clase de fitness + yoga</p>
                <p className='py-2 border-b mx-8'>Acces la sauna si dusuri premium</p>
                <p className='py-2 border-b mx-8'>Orar: 24/7</p>
              </div>
              <button className='bg-green-600 w-[200px] rounded-md flex justify-center font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
            </info>
          </abonament>
        </div>
      </div>
    </div>
  );
}

export default Abonamente;