import React from 'react'

function Navbar() {
  return (
   
    <nav className='bg-purple-300'>
        <div className="mycontainer flex justify-between item-centre p-3"> 
      <div className='logo font-bold text-2xl hover:text-white'>
        <span className='text-purple-900'>&lt;</span>
        Pass
        <span className="text-purple-900">Op/&gt;</span>
        </div>
      
      <button className="flex text-white h-10 bg-purple-800 rounded-full justify- items-center ring-white ring-1 ">
        <img src="/icons/25231.png" alt="GitHub" className='w-10  p-1' />
        <span className='font-bold px-2 '>Github</span>
      </button>
        </div>
     
    </nav>
  )
}

export default Navbar
