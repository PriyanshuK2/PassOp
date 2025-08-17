import React from 'react'

function Footer() {
  return (
    <div className=' bg-purple-300 w-full flex flex-col justify-center items-center'>
      <div>
      <div className='logo font-bold text-xl hover:text-white'>
        <span className='text-purple-800'>&lt;</span>
        Pass
        <span className="text-purple-800">Op/&gt;</span>
        </div>
      </div>

      <div>
        <span>  <ul>
        <li className='gap-4 flex '>
            <a className='hover:font-bold' href={'/'}>
                About
            </a>
            <a className='hover:font-bold' href='/'>
                Contact
            </a>
        </li>
      </ul></span>
      </div>
    </div>
  )
}

export default Footer
