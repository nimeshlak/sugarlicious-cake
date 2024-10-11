import React from 'react'
import {assets} from "../assets/admin_assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <img src={assets.logo} alt="Sugarlicious Logo" className="h-12 w-auto mb-1" />
      </div>
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar