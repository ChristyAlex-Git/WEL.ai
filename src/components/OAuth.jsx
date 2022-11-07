import React from 'react'
import {FcGoogle} from "react-icons/fc"

export default function OAuth() {
  return (
    <button className='flex items-center justify-center
    w-full bg-red-70 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition divide-purple-200 ease-in-out rounded-md'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue WIth Google
    </button>
  )
}
