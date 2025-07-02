import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { RiMenuFoldLine, RiMenuFold2Line } from "react-icons/ri";

const Navbar = () => {
  const [nav, setNav] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowReg] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  
  const handleLoginToggle = () => {
    setShowLogin(!showLogin)
  }
  const handleRegToggle = () => {
    setShowReg(!showRegister)
  }
  useEffect(() => {
    const handleRes = () => {
      if (window.innerWidth >= 768) {
        setNav(true);
      }
    };

    window.addEventListener('resize', handleRes);
    return () => window.removeEventListener('resize', handleRes);
  }, []);
  
  return (
    <div className="text-white bg-[#3A3A3A] flex justify-between items-center">
      <h1 className="text-green-600 text-3xl font-bold p-3">GymGrig</h1>
      <ul className='hidden md:flex'>
        <li className='p-3'><Link to='/'>Acasa</Link></li>
        <li className='p-3'><Link to='/abonamente'>Abonamente</Link></li>
        <li className='p-3'><Link to='/despre'>Despre</Link></li>
        <li className='p-3'><Link to='/galerie'>Galerie</Link></li>
        <li className='p-3'><Link to='/contact'>Contact</Link></li>
        <li className='p-3'>
          <button onClick={handleLoginToggle}>Log In</button>
        </li>
        <li className='p-3'><button onClick={handleRegToggle}>Creare cont</button></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <RiMenuFold2Line size={20} /> : <RiMenuFoldLine size={20} />}
      </div>
      
      {/*Meniu pt telefon*/}
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-800 h-full bg-[#3A3A3A] z-10 ease-in-out duration-300' : 'fixed left-[-100%]'}
      >
        <h1 className="text-green-600 text-3xl font-bold p-3">GymGrig</h1>
        <ul className='uppercase'>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}>
            <Link to='/'>Acasa</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}>
            <Link to='/abonamente'>Abonamente</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}>
            <Link to='/despre'>Despre</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}>
            <Link to='/galerie'>Galerie</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}>
            <Link to='/contact'>Contact</Link>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]'>
            <button onClick={ () => {handleLoginToggle(); handleNav()}}>Conectare</button>
          </li>
          <li className='p-3 border-b border-[#5C5C5C]'>
            <button onClick={ () => {handleRegToggle(); handleNav()}}>Inregistrare</button>
          </li>
        </ul>
      </div>
      
      {/* Popup de login */}
      {showLogin && (
        <div className="fixed inset-0 bg-gray-950/75 flex items-center justify-center z-10">
          <div className="bg-[#3A3A3A] text-white p-6 rounded-lg w-full max-w-md mx-4">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-4">
              <div>
                <label className="block  font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="exemplu@email.com" 
                  className="w-full p-3 border rounded"
                  required 
                />
              </div>
              <div>
                <label className="block  font-bold mb-2">Parola</label>
                <input 
                  type="password" 
                  placeholder="Scrie parola" 
                  className="w-full p-3 border rounded "
                  required 
                />
              </div>
              <div>
                <label className='flex justify-center '>Nu ai un cont?<button className='text-green-600' onClick={()=>{handleLoginToggle(); handleRegToggle()}}> Creaza unul.</button></label>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-green-600 text-white p-3 rounded hover:bg-green-600"
                >
                  Conecteaza-te
                </button>
                <button 
                  type="button" 
                  onClick={() => {handleLoginToggle()}}
                  className="flex-1 bg-gray-500 text-white p-3 rounded hover:bg-gray-500"
                >
                  Inchide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup de register */}
      {showRegister && (
        <div className="fixed inset-0 bg-gray-950/75 flex items-center justify-center z-10">
          <div className="bg-[#3A3A3A] p-6 rounded-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold  mb-4">Creare cont</h2>
            <form className="space-y-4">
              <div>
                <label className="block  font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="exemplu@email.com" 
                  className="w-full p-3 border rounded "
                  required 
                />
              </div>
              <div>
                <label className="block  font-bold mb-2">Parola</label>
                <input 
                  type="password" 
                  placeholder="Creaza o parola sigura" 
                  className="w-full p-3 border rounded "
                  required 
                />
              </div>
              <div>
                <label className=' flex justify-center'>Ai deja un cont? <button className='text-green-600' onClick={()=>{handleRegToggle(); handleLoginToggle()}} >Conecteaza-te.</button></label>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-green-600 text-white p-3 rounded hover:bg-green-700"
                >
                  Inregistreaza-te
                </button>
                <button 
                  type="button" 
                  onClick={() => {handleRegToggle()}}
                  className="flex-1 bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
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