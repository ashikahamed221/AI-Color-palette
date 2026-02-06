import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className=' text-2xl text-center md:text-5xl font-serif mb-4'>Welcome to AI Color Palette🎨</h1>
        <p className=' font-sans text-center md:text-2xl mb-4'>Type Your Keyword and Get Your Color Palette</p>
       <Link to='/App' className='py-2 px-3 md:px-4 py-3 bg-black text-white md:text-2xl rounded shadow-lg hover:bg-neutral-950'>Let's Search</Link>
    </div>
  )
}

export default Home
