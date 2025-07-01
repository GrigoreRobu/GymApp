import React, { useState, useEffect } from 'react'
import { Link, } from 'react-router-dom';
import { RiMenuFoldLine, RiMenuFold2Line } from "react-icons/ri";

const Navbar = () => {
  const [nav, setNav] = useState(true)
  const handleNav = () => {
    setNav(!nav)
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
    <div className="text-white bg-[#3A3A3A] flex justify-between  items-center">
      
      <h1 className=" text-green-600 text-3xl font-bold p-3">GymGrig</h1>
      <ul className='hidden md:flex'>
        <li className='p-3'><Link to='/'>Acasa</Link></li>
        <li className='p-3'><Link to='/abonamente'>Abonamente</Link></li>
        <li className='p-3'><Link to='/despre'>Despre</Link></li>
        <li className='p-3'><Link to='/galerie'>Galerie</Link></li>
        <li className='p-3'><Link to='/contact'>Contact</Link></li>
        <li className='p-3'>Log In</li>
        <li className='p-3'>Creare cont</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <RiMenuFold2Line size={20} /> : <RiMenuFoldLine size={20} />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-800 h-full bg-[#3A3A3A] z-10 ease-in-out duration-300' : 'fixed left-[-100%]'}>
        <h1 className=" text-green-600 text-3xl font-bold p-3">GymGrig</h1>
        <ul className=' uppercase'>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}><Link to='/'>Acasa</Link></li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}><Link to='/abonamente'>Abonamente</Link></li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}><Link to='/despre'>Despre</Link></li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}><Link to='/galerie'>Galerie</Link></li>
          <li className='p-3 border-b border-[#5C5C5C]' onClick={() => setNav(true)}><Link to='/contact'>Contact</Link></li>
          <li className='p-3 border-b border-[#5C5C5C]' >Log In</li>
          <li className='p-3 border-b border-[#5C5C5C]' >Creare cont</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar