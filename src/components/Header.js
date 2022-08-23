import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const menu = <>

        <li><Link className='shadow md:mr-3' to='/'>Home</Link></li>
        <li><Link className='shadow md:mr-3' to='/completedtasks'>Completed Tasks</Link></li>
        <li><Link className='shadow md:mr-3' to='/todo'>To-Do</Link></li>
        <li><Link className='shadow md:mr-3' to='/calendar'>Calendar</Link></li>
    </>
    return (
        <div>
            <div class="navbar  sticky top-0 z-50 shadow-lg bg-gray-900 text-white">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-900 text-white rounded-box w-52">

                        </ul>
                    </div>

                    <div className="flex-shrink-0 w-fit lg:mx-40">
                        <h1
                            className="cursor-pointer uppercase  text-xl font-bold logo">
                            ToDo-App
                        </h1>
                    </div>
                    {/* <a class="btn btn-ghost normal-case text-xl">Moto-Parts</a> */}
                </div>
                <div class="navbar-end hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">

                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Header;