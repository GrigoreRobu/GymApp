import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

function Cont() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profil');

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    nume: '',
    prenume: '',
    telefon: '',
    adresa: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setEditData({
              nume: data.nume || '',
              prenume: data.prenume || '',
              telefon: data.telefon || '',
              adresa: data.adresa || ''
            });
          }
        } catch (error) {
          console.error('Eroare la preluarea datelor:', error);
          setError('Eroare la incarcarea datelor');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        nume: editData.nume,
        prenume: editData.prenume,
        telefon: editData.telefon,
        adresa: editData.adresa,
        ultimaModificare: new Date().toISOString()
      });

      setUserData(prev => ({ ...prev, ...editData }));
      setEditMode(false);
      setSuccess('Profilul a fost actualizat cu succes!');
    } catch (error) {
      setError('Eroare la actualizarea profilului');
    }
    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Parolele nu coincid');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Parola trebuie sa aiba cel putin 6 caractere');
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      await updatePassword(user, passwordData.newPassword);
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Parola a fost schimbata cu succes!');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError('Parola curenta este gresita');
      } else {
        setError('Eroare la schimbarea parolei');
      }
    }
    setLoading(false);
  };

  const getAbonamentStatus = () => {
    if (!userData?.abonament) {
      return { status: 'Inactiv', color: 'text-red-400', bg: 'bg-red-500/20' };
    }
    
    const expiry = new Date(userData.abonament.dataExpirare);
    const today = new Date();
    
    if (expiry < today) {
      return { status: 'Expirat', color: 'text-red-400', bg: 'bg-red-500/20' };
    }
    
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) {
      return { status: `Expira in ${daysLeft} zile`, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    }
    
    return { status: 'Activ', color: 'text-green-400', bg: 'bg-green-500/20' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center">
        <div className="text-2xl">Se incarca...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Acces Restricționat</h1>
          <p className="text-xl">Trebuie sa te conectezi pentru a accesa aceasta pagina</p>
        </div>
      </div>
    );
  }

  const abonamentStatus = getAbonamentStatus();

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-600 mb-4">Contul Meu</h1>
          <p className="text-xl text-gray-300">
            Buna, {userData?.prenume || 'User'}! Gestioneaza-ti contul si abonamentul
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profil')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'profil' 
                ? 'bg-green-600 text-white' 
                : 'bg-[#3A3A3A] text-gray-300 hover:bg-gray-600'
            }`}
          >
            Profil Personal
          </button>
          <button
            onClick={() => setActiveTab('abonament')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'abonament' 
                ? 'bg-green-600 text-white' 
                : 'bg-[#3A3A3A] text-gray-300 hover:bg-gray-600'
            }`}
          >
            Abonament
          </button>
          <button
            onClick={() => setActiveTab('securitate')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'securitate' 
                ? 'bg-green-600 text-white' 
                : 'bg-[#3A3A3A] text-gray-300 hover:bg-gray-600'
            }`}
          >
            Securitate
          </button>
        </div>

        {activeTab === 'profil' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#3A3A3A] p-8 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-500">Informatii Personale</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {editMode ? 'Anuleaza' : 'Editeaza'}
                </button>
              </div>

              {!editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nume</label>
                    <p className="text-white text-lg">{userData?.nume || 'Nu este setat'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Prenume</label>
                    <p className="text-white text-lg">{userData?.prenume || 'Nu este setat'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Telefon</label>
                    <p className="text-white text-lg">{userData?.telefon || 'Nu este setat'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Adresa</label>
                    <p className="text-white text-lg">{userData?.adresa || 'Nu este setata'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Nume</label>
                    <input
                      type="text"
                      value={editData.nume}
                      onChange={(e) => setEditData({...editData, nume: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Prenume</label>
                    <input
                      type="text"
                      value={editData.prenume}
                      onChange={(e) => setEditData({...editData, prenume: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={editData.telefon}
                      onChange={(e) => setEditData({...editData, telefon: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                      placeholder="0722 123 456"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Adresa</label>
                    <textarea
                      value={editData.adresa}
                      onChange={(e) => setEditData({...editData, adresa: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                      rows="3"
                      placeholder="Strada, numar, oras..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Se salveaza...' : 'Salveaza Modificarile'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-[#3A3A3A] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-green-500 mb-6">Statistici Cont</h2>
              <div className="space-y-6">
                <div className="text-center p-4 bg-gray-700 rounded">
                  <div className="text-2xl font-bold text-green-400">
                    {userData?.dataCrearii ? 
                      Math.floor((new Date() - new Date(userData.dataCrearii)) / (1000 * 60 * 60 * 24)) 
                      : 0
                    }
                  </div>
                  <p className="text-gray-300">Zile ca membru</p>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded">
                  <div className="text-2xl font-bold text-green-400">
                    {userData?.antrename || 0}
                  </div>
                  <p className="text-gray-300">Antrenamente completate</p>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded">
                  <div className="text-2xl font-bold text-green-400">
                    {userData?.puncteFidelitate || 0}
                  </div>
                  <p className="text-gray-300">Puncte de fidelitate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Abonament Tab */}
        {activeTab === 'abonament' && (
          <div className="space-y-8">
            <div className="bg-[#3A3A3A] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-green-500 mb-6">Status Abonament</h2>
              
              {userData?.abonament ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm">Tip Abonament</label>
                        <p className="text-white text-xl font-semibold">{userData.abonament.tip}</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Status</label>
                        <p className={`text-lg font-semibold ${abonamentStatus.color}`}>
                          {abonamentStatus.status}
                        </p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Data Activare</label>
                        <p className="text-white">
                          {new Date(userData.abonament.dataActivare).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Data Expirare</label>
                        <p className="text-white">
                          {new Date(userData.abonament.dataExpirare).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Pret Lunar</label>
                        <p className="text-white text-lg">{userData.abonament.pret} RON</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${abonamentStatus.bg}`}>
                    <h3 className="text-xl font-bold mb-4">Beneficii Incluse</h3>
                    <ul className="space-y-2">
                      {userData.abonament.beneficii?.map((beneficiu, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-400 mr-3">✓</span>
                          {beneficiu}
                        </li>
                      )) || (
                        <>
                          <li className="flex items-center">
                            <span className="text-green-400 mr-3">✓</span>
                            Acces la toate echipamentele
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-400 mr-3">✓</span>
                            Clase de grup
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-gray-400 mb-4">Nu ai un abonament activ</h3>
                  <p className="text-gray-300 mb-6">Alege un abonament pentru a incepe antrenamentele</p>
                  <a href="/abonamente">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors">
                      Vezi Abonamentele
                    </button>
                  </a>
                </div>
              )}
            </div>

            {userData?.abonament && (
              <div className="bg-[#3A3A3A] p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-green-500 mb-6">Istoric Plati</h2>
                <div className="space-y-3">
                  {userData.abonament.istoricPlati?.length > 0 ? (
                    userData.abonament.istoricPlati.map((plata, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-700 rounded">
                        <div>
                          <p className="font-medium">{plata.data}</p>
                          <p className="text-gray-400 text-sm">{plata.descriere}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">{plata.suma} RON</p>
                          <p className="text-gray-400 text-sm">{plata.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">Nu exista istoric de plati</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Securitate Tab */}
        {activeTab === 'securitate' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#3A3A3A] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-green-500 mb-6">Schimba Parola</h2>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Parola Curenta</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Parola Noua</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Confirma Parola Noua</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Se schimba parola...' : 'Schimba Parola'}
                </button>
              </form>
            </div>

            <div className="bg-[#3A3A3A] p-8 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-green-500 mb-6">Informatii Cont</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Cont creat pe</label>
                  <p className="text-white">
                    {userData?.dataCrearii ? 
                      new Date(userData.dataCrearii).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) 
                      : 'Nu este disponibil'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Ultima conectare</label>
                  <p className="text-white">
                    {user?.metadata?.lastSignInTime ? 
                      new Date(user.metadata.lastSignInTime).toLocaleDateString('ro-RO')
                      : 'Nu este disponibil'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">ID Utilizator</label>
                  <p className="text-gray-400 text-sm font-mono">{user?.uid}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cont;