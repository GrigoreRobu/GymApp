import React from 'react';
import img1 from '../img/img1.jpg'
import img2 from '../img/img2.jpg'
import img3 from '../img/img3.jpg'
import img4 from '../img/img4.jpg'
import img5 from '../img/img5.jpg'
import img6 from '../img/img6.jpg'

function Galerie() {
  return (
    <div className="p-1">
      <h1 className="text-4xl flex font-bold justify-center items-center mb-3">Galerie</h1>
      <div className=' flex gap-4 justify-center flex-wrap'>
        <img src={img1} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
        <img src={img2} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
        <img src={img3} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
        <img src={img4} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
        <img src={img5} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
        <img src={img6} className='max-w-[90%] md:max-w-[420px] h-auto'></img>
      </div>
    </div>
  );
}

export default Galerie;