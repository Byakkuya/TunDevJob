import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import logo from "../assets/img/logo.png"
import {FaXmark, FaBars} from "react-icons/fa6"

const Navbar=()=>{
    const user = {
        user: {
            accountType: "Developer"
        }
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    
    //Toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }



    useEffect(() => {
        const handlescroll = () => {
            if(window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handlescroll);

        return () => {
            window.addEventListener('scroll',handlescroll);
        }
    })
    // navigation array
    const navItems = [
        {link: "Home",path:"home"},
        {link: "FindJobs",path:"Find-jobs"},
        {link: "Companies",path:"Companies"},




    ]
    return (


        <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
            <nav className={`py-4 lg:px-14 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300j" : ""}`}>
                <div className="flex items-center justify-between text-base gap-8">
                    <a href="/" className="text-2xl font-semibold flex items-center space-x-3">
                        <img src={logo} alt="" className="w-10 inline-block"/>
                        <span className="text-[#263238]">TunDevJobs</span>
                    </a>

                    {/* Nav items for large devices */}
                    <ul className="md:flex space-x-12 hidden ">
                        {navItems.map(({link, path}) => (
                            <li key={path} className="first:font-medium">
                                <Link to={path} className="block text-base transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Buttons for large devices */}
                    <div className=" sm:flex ssm:flex space-x-12 hidden lg:flex items-center">
                        <a href="/login" className="transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                            Login
                        </a>
                        <a href="/signup">
                        <button
                            className="bg-indigo-950 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-indigo-200">
                            Sign Up
                        </button>
                    </a>
                    </div>

                    {/* Menu button for mobile devices */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <FaXmark className="ssm:mx-1 h-6 w-6 text-[#263238]"/>
                            ) : (
                                <FaBars className="ssm:mx-1 h-6 text-[#263238]"/>
                            )}
                        </button>
                    </div>

                </div>
            </nav>

            {/* nav items for mobile devices*/}
            <div className={`space-y-4 ssm:space-y-1 px-4 mt-16 py-7 bg-gradient-to-t from-indigo-400 to-[#e9f8ff] ${ isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>
                {navItems.map(({link, path}) => (
                    <li key={path} className="first:font-medium">
                        <Link to={path} className="block text-base text-white hover:text-black">
                            {link}
                        </Link>
                    </li>
                ))}
            </div>
        </header>

    )

}

export default Navbar;
