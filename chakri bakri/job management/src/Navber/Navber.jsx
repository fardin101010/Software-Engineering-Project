import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import imgUser from '../../src/assets/user.png';
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo (2).png'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    };

    const links = (
        <>
            <li className="text-xl font-bold"><NavLink to={'/'}>Home</NavLink></li>
            <li className="text-xl font-bold"><NavLink to={'/add'}>Add job</NavLink></li>
            <li className="text-xl font-bold"><NavLink to={'/post'}>My posted jobs</NavLink></li>
            <li className="text-xl font-bold"><NavLink to={'/bid'}>My Bids</NavLink></li>
            <li className="text-xl font-bold"><NavLink to={'/request'}>Bid Requests</NavLink></li>
        </>
    );

    return (
        <div className="navbar px-10 bg-[#1976D2]">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn text-orange-500 btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content text-orange-500 mt-3 z-[1] p-2 shadow bg-[#1976D2] rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center w-80">
                        <img className="w-20 hidden lg:block" src={logo} alt="" />
                        <div className="">
                            <a className="btn btn-ghost hidden lg:block text-white text-2xl  font-bold normal-case">Chakri Bakri</a>
                            <h1 className="text-xl  hidden lg:block text-gray-400 font-bold -mt-3">Get Your Dream job</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-center text-white hidden text-xl  lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {/* <p className="text-xl text-orange-500">{user.displayName}</p> */}
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">



                    <div className="w-10 rounded-full">
                        <img src={user ? (user.photoURL || imgUser) : imgUser} alt="User" />
                    </div>
                </label>
                {user ? (
                    <Link to={'/login'}>
                        <button className="text-xl rounded-md hover:bg-lime-400 text-white border px-2 py-2 border-red-700" onClick={handleSignOut}>
                            Log Out
                        </button>
                    </Link>
                ) : (
                    <Link to={'/login'}>
                        <button className="text-xl hover:bg-lime-400  rounded-md text-white border px-2 py-2 border-red-700">Login</button>
                    </Link>
                )}

            </div>
        </div>
    );
};

export default Navbar;
