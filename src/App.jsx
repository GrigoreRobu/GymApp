import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Acasa from './pages/Acasa.jsx';
import Abonamente from './pages/Abonamente.jsx';
import Contact from './pages/Contact.jsx';
import Despre from './pages/Despre.jsx';
import Galerie from './pages/Galerie.jsx';
import Navbar from "./assets/navbar.jsx";
import Footer from "./assets/footer.jsx";
import Cont from "./privat/cont.jsx";
import Success from './pages/Success';

function App() {
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1 text-white bg-[#1F1F1F]">
        <Routes>
          <Route path="/" element={<Acasa />} />         
          <Route path="/abonamente" element={<Abonamente />} />   
          <Route path="/contact" element={<Contact/>} />   
          <Route path="/despre" element={<Despre />} />   
          <Route path="/galerie" element={<Galerie />} />      
          <Route path='/cont' element={<Cont/>}/>
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
