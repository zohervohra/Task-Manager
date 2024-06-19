import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <div className=" navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='./' >Home</Link></li>
                            {/* <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li> */}
                            <li><Link to='./dashboard'>Dashboard</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Taskify</a>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='./' className='text-md'>Home</Link></li>
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                        <li ><Link to='./dashboard'>Dashboard</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {}
             
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">       <Link className="btn p-1 mx-2 px-2 md:p-2 md:px-3 btn-primary rounded-xl " to='./login'>Login</Link>
                    <Link className="btn p-1 md:p-2  md:py-1  btn-primary rounded-xl " to='./signUp'>Sign Up</Link></form> :
      <form className="d-flex" role="search"><Link className="btn p-1 md:p-2  md:py-1  btn-primary rounded-xl"  to='/login' onClick={()=>{
        localStorage.removeItem('token')
        nagivate.push('/login')
      }}>Logout</Link> </form>
      }
                </div>
            </div>
        </div>
    )
}

