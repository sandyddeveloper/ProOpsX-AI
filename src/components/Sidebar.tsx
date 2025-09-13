"use client"
import React from 'react'
import Logo from "@/assets/logo.png"
import Image from 'next/image'

const Sidebar = () => {
    return (
        <aside className='w-[20%] h-screen max-h-screen overflow-y-scroll overflow-x-hidden p-3 border-r-[1px] border-[#000] fixed top-0 left-0'>
            <div className="flex items-center justify-center gap-3">
  <Image
    src={Logo}
    alt="Logo"
    className="rounded-lg shadow-md"
  />
  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Pro<span className="text-purple-600">Ops</span>X
  </h2>
</div>


        </aside>
    )
}

export default Sidebar