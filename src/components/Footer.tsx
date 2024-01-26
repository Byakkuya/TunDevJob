import React from 'react';
import logo from "../assets/img/logo.png"
const Footer = () => {
    return (
        <footer className="w-full p-8 bg-white">
            <div
                className="flex flex-row flex-wrap items-center justify-center text-center bg-white gap-y-6 gap-x-12 md:justify-between">
                <img src={logo} alt="logo-ct" className="w-10"/>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <a href="/about/About"
                           className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="/home"
                           className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/contact/Contact"
                           className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                            Contact
                        </a>
                    </li>

                </ul>
            </div>
            <span className="block my-8 border-t border-blue-gray-50"/>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-center text-blue-gray-900">
                © 2024 Tunisian Developers Jobs
            </p>
        </footer>
    );
};

export default Footer;