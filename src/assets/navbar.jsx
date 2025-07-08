import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { RiMenuFoldLine, RiMenuFold2Line } from "react-icons/ri";
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';


const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // State pentru formuri
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    nume: '',
    prenume: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleNav = () =>
    setNav(prev => !prev);
  const handleLoginToggle = () => {
    setShowLogin(prev => !prev);
    setError('');
  }
  const handleRegToggle = () => {
    setShowRegister(prev => !prev);
    setError('');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          }
        } catch (error) {
          console.error('Eroare la preluarea datelor:', error)
        }
      } else {
        setUserData(null)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleRes = () => {
      if (window.innerWidth >= 768) {
        setNav(false);
      }
    };

    window.addEventListener('resize', handleRes);
    return () => window.removeEventListener('resize', handleRes);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      setShowLogin(false)
      setLoginData({ email: '', password: '' })
    } catch (error) {
      setError(getErrorMessage(error.code))
    }
    setLoading(false)
  }

  const handleRegister = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  // Validare
  if (registerData.password !== registerData.confirmPassword) {
    setError('Parolele nu coincid')
    setLoading(false)
    return
  }

  if (registerData.password.length < 6) {
    setError('Parola trebuie sa aiba cel putin 6 caractere')
    setLoading(false)
    return
  }

  try {
    // 1. Creeaza cont in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
    const newUser = userCredential.user // Foloseste newUser, nu user

    // 2. Salveaza datele in Firestore
    await setDoc(doc(db, 'users', newUser.uid), {
      nume: registerData.nume,
      prenume: registerData.prenume,
      email: registerData.email,
      uid: newUser.uid,
      dataCrearii: new Date().toISOString(),
      abonament: null
    })

    // 3. Inchide popup-ul si reseteaza form-ul
    setShowRegister(false)
    setRegisterData({
      nume: '',
      prenume: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    console.log('Utilizator creat si salvat in Firestore!') // Pentru debug

  } catch (error) {
    console.error('Eroare la creare cont:', error) // Pentru debug
    setError(getErrorMessage(error.code))
  }
  setLoading(false)
}
  // Functie logout
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Eroare logout:', error)
    }
  }

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Emailul este deja folosit'
      case 'auth/weak-password':
        return 'Parola este prea slaba'
      case 'auth/user-not-found':
        return 'Utilizatorul nu exista'
      case 'auth/wrong-password':
        return 'Parola gresita'
      case 'auth/invalid-email':
        return 'Email invalid'
      default:
        return 'A aparut o eroare. Incearca din nou.'
    }
  }


  return (
    <div className="text-white bg-[#3A3A3A] flex justify-between items-center">
      <h1 className="text-green-600 text-3xl font-bold p-3"><Link to='/'>GymGrig</Link></h1>
      <h1 className="text-green-600 text-3xl font-bold p-3"><Link to='/'>GymGrig</Link></h1>
      <ul className='hidden md:flex'>
        <li className='p-3'><Link to='/'>Acasa</Link></li>
        <li className='p-3'><Link to='/abonamente'>Abonamente</Link></li>
        <li className='p-3'><Link to='/despre'>Despre</Link></li>
        <li className='p-3'><Link to='/galerie'>Galerie</Link></li>
        <li className='p-3'><Link to='/contact'>Contact</Link></li>

        {/* Afisare diferita pentru utilizatori conectati */}
        {user ? (
          <>
            <li>

            </li>
            <li className='p-3'>
              <button className=''><Link to="/cont">Cont</Link>
              </button>
            </li>
            <li className='p-3'>
              <button onClick={handleLogout} className="hover:text-green-400">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className='p-3'>
              <button onClick={handleLoginToggle}>Conectare</button>
            </li>
            <li className='p-3'><button onClick={handleRegToggle}>Creare cont</button></li>
          </>
        )}
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <RiMenuFold2Line size={20} /> : <RiMenuFoldLine size={20} />}
      </div>


      {/*Meniu pt telefon*/}
      <div className={nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-800 h-full bg-[#3A3A3A] z-10 ease-in-out duration-300' : 'fixed left-[-100%]'}
      >
        <h1 className="text-green-600 text-3xl font-bold p-3"><Link to='/'>GymGrig</Link></h1>
        <h1 className="text-green-600 text-3xl font-bold p-3"><Link to='/'>GymGrig</Link></h1>
        <ul className='uppercase'>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(false)}>
            <Link to='/'>Acasa</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(false)}>
            <Link to='/abonamente'>Abonamente</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(false)}>
            <Link to='/despre'>Despre</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(false)}>
            <Link to='/galerie'>Galerie</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(false)}>
            <Link to='/contact'>Contact</Link>
          </li>

          {/* Meniu mobil pentru utilizatori */}
          {user ? (
            <>
              <li className='p-3 border-b border-[#5C5C5C]'>
                <span className="text-green-400">Conectat: {user.email}</span>
              </li>
              <li className='p-3'>
                <button onClick={() => { handleLogout(); setNav(false) }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='p-3 border-b border-[#5C5C5C]'>
                <button onClick={() => { handleLoginToggle(); handleNav() }}>Conectare</button>
              </li>
              <li className='p-3 border-b border-[#5C5C5C]'>
                <button onClick={() => { handleRegToggle(); handleNav() }}>Inregistrare</button>
              </li>
            </>
          )}
        </ul>
      </div>


      {/* Popup de login */}
      {showLogin && (
        <div className="fixed text-xs sm:text-2xl inset-0 bg-gray-950/75 flex items-center justify-center z-50">
          <div className="bg-[#3A3A3A] max-w-[80%] md:max-w-md text-white p-6 rounded-lg w-full mx-4">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Login</h2>

            {/* Afisare erori */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="exemplu@email.com"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Parola</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Scrie parola"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className='flex text-xs sm:text-2xl justify-center '>Nu ai un cont?<button type="button" className='text-green-600' onClick={() => { handleLoginToggle(); handleRegToggle() }}> Creaza unul.</button></label>
              </div>
              <div className="flex space-x-3 justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="max-w-[50%] sm:max-w-full flex-1 text-xs sm:text-2xl bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Se conecteaza...' : 'Conecteaza-te'}
                </button>
                <button
                  type="button"
                  onClick={() => { handleLoginToggle() }}
                  className="max-w-[50%] sm:max-w-full flex-1 text-xs sm:text-2xl bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
                >
                  Inchide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup de creare cont */}
      {showRegister && (
        <div className="fixed text-xs sm:text-2xl inset-0 bg-gray-950/75 flex items-center justify-center z-50">
          <div className="bg-[#3A3A3A] p-6 rounded-lg w-full max-w-[80%] md:max-w-md mx-4">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Creare cont</h2>

            {/* Afisare erori */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block font-bold mb-2">Nume</label>
                  <input
                    type="text"
                    value={registerData.nume}
                    onChange={(e) => setRegisterData({ ...registerData, nume: e.target.value })}
                    placeholder="Popescu"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-bold mb-2">Prenume</label>
                  <input
                    type="text"
                    value={registerData.prenume}
                    onChange={(e) => setRegisterData({ ...registerData, prenume: e.target.value })}
                    placeholder="Alin"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="exemplu@email.com"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Parola</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Creaza o parola sigura"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Confirma parola</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  placeholder="Reintrodu parola pentru confirmare"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className='flex text-xs sm:text-2xl justify-center'>Ai deja un cont? <button type="button" className='text-green-600' onClick={() => { handleRegToggle(); handleLoginToggle() }} >Conecteaza-te.</button></label>
              </div>
              <div className="flex space-x-3 justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="max-w-[50%] sm:max-w-full flex-1 text-xs sm:text-2xl bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Se inregistreaza...' : 'Inregistreaza-te'}
                </button>
                <button
                  type="button"
                  onClick={() => { handleRegToggle() }}
                  className="max-w-[50%] sm:max-w-full flex-1 text-xs sm:text-2xl bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
                >
                  Inchide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar