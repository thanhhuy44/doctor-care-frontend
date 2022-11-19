import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import logo from '~/assets/images/logo.png';

function Header() {
    const [displayNavbar, setDisplayNavbar] = useState(false);

    return (
        <div className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-700">
            <div className="container mx-auto flex items-center justify-around h-20">
                <div
                    className="block lg:hidden p-4 text-3xl text-center min-w-[68px] active:text-blue-400"
                    onClick={() => setDisplayNavbar(!displayNavbar)}
                >
                    {displayNavbar ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                </div>
                <div className="w-52 h-full">
                    <Link to="/" className="w-full h-full">
                        <img className="w-full h-full py-2" src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="mx-12 flex-1 hidden lg:block">
                    <Navbar />
                </div>
                <div className="p-3 text-3xl cursor-pointer hover:text-cyan-900 block">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </div>
            </div>
            <div
                className={`absolute left-0 top-[81px] h-[100vh] bg-white border-r shadow-sm duration-300 ${
                    displayNavbar ? 'translate-x-0' : 'translate-x-[-100%]'
                }`}
            >
                <Navbar onClick={() => setDisplayNavbar(!displayNavbar)} />
            </div>
        </div>
    );
}

export default Header;
