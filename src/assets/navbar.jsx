import React,{useState} from 'react'
import { RiMenuFoldLine, RiMenuFold2Line } from "react-icons/ri";

const Navbar = () => {
  const [nav, setNav] = useState(true)
  const handleNav =() =>{
    setNav(!nav)
  }
  return (
    <div className="text-white flex justify-between mx-auto max-w-[1280px] items-center">
      <h1 className=" text-green-600 text-3xl font-bold p-3">GymGrig</h1>
      <ul className='hidden md:flex'>
        <li className='p-3'>Acasa</li>
        <li className='p-3'>Abonamente</li>
        <li className='p-3'>Despre</li>
        <li className='p-3'>Galerie</li>
        <li className='p-3'>Contact</li>
        <li className='p-3'>LogIn</li>
        <li className='p-3'>Creare cont</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <RiMenuFold2Line size={20} /> : <RiMenuFoldLine size={20} />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-800 h-full bg-[#3A3A3A] ease-in-out duration-300' : 'fixed left-[-100%]'}>
        <h1 className=" text-green-600 text-3xl font-bold p-3">GymGrig</h1>
        <ul className=' uppercase'>
          <li className='p-3 border-b border-[#5C5C5C]'>Acasa</li>
          <li className='p-3 border-b border-[#5C5C5C]'>Abonamente</li>
          <li className='p-3 border-b border-[#5C5C5C]'>Despre</li>
          <li className='p-3 border-b border-[#5C5C5C]'>Galerie</li>
          <li className='p-3 border-b border-[#5C5C5C]'>LogIn</li>
          <li className='p-3 border-b border-[#5C5C5C]'>Creare cont</li>
          <li className='p-3'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar