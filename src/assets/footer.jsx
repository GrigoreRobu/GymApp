import React from "react";

export default function Footer() {
  return (
    <div className="text-xs gap-1 absolute bottom-0 inset-x-0 z-[-1] flex justify-center bg-black text-white">
      ©Copyright by 
      <a href="https://github.com/GrigoreRobu" className="underline text-gray-100">
        Robu Grigore
      </a>
    </div>
  );
}
