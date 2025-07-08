import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-600 mb-6">Contact</h1>
          <p className="text-xl text-gray-300">
            Contacteaza-ne pentru mai multe informatii sau programeaza o vizita!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-8">Informatii Contact</h2>
            
            <div className="space-y-6">
              <div className="bg-[#3A3A3A] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Adresa</h3>
                <p className="text-gray-300">
                  Strada Calea Bucuresti nr. 127<br/>
                  Craiova, Dolj<br/>
                  Cod postal: 200512
                </p>
              </div>

              <div className="bg-[#3A3A3A] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Program</h3>
                <div className="text-gray-300 space-y-1">
                  <p>Luni - Vineri: 06:00 - 23:00</p>
                  <p>Sambata - Duminica: 08:00 - 22:00</p>
                  <p className="text-green-400 font-medium">Premium 24/7: Acces non-stop</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-8">Echipa Noastra</h2>
            
            <div className="space-y-6">
              <div className="bg-[#3A3A3A] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Andrei Popescu</h3>
                <p className="text-gray-400 mb-3">Manager General</p>
                <div className="space-y-2 text-gray-300">
                  <p>0741 234 567</p>
                  <p>andrei.popescu@gymgrig.ro</p>
                </div>
              </div>

              <div className="bg-[#3A3A3A] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Maria Ionescu</h3>
                <p className="text-gray-400 mb-3">Antrenor Principal</p>
                <div className="space-y-2 text-gray-300">
                  <p>0756 789 123</p>
                  <p>maria.ionescu@gymgrig.ro</p>
                </div>
              </div>

              <div className="bg-[#3A3A3A] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Radu Mihai</h3>
                <p className="text-gray-400 mb-3">Receptioner / Informatii</p>
                <div className="space-y-2 text-gray-300">
                  <p>0732 456 890</p>
                  <p>radu.mihai@gymgrig.ro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;