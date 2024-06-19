import React from 'react'
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className='bg-base-100'>
     

  <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
    <h1 className=" text-3xl md:text-5xl  font-bold">Simplify Your Life, <br/>One Task at a Time</h1>
    <p className="text-lg text-gray-500">Organize your work by using this task list website<br/></p>
    <Link to='./signUp'><button className="btn btn-active btn-accent rounded-2xl px-6">Start Now</button></Link>
    </div>
    
    </div>
  )
}
