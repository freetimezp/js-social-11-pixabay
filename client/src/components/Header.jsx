import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase.config';

import { Logo } from '../assets';

const Header = () => {
    const [user, setUser] = useState(null);
    const [color, setColor] = useState(false);

    const provider = new GoogleAuthProvider();

    const changeColor = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY >= 1) {
                setColor(true);
            } else {
                setColor(false);
            }
        }
    }

    if (typeof window !== 'undefined') {
        window.addEventListener("scroll", changeColor);
    }

    const signWithGmail = async () => {
        await signInWithRedirect(firebaseAuth, provider).then(result => {
            console.log(result.user.providerData[0]);
        })
    }

    return (
        <header className={`fixed inset-x-0 px-8 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between
            z-50 translate-all duration-500 ${color ? 'bg-white/80' : 'bg-transparent'}`}>
            <Link to={"/"}>
                <img src={Logo} alt="logo" className="w-24 h-auto object-contain" />
            </Link>

            {user ? (
                <>
                    <div className='relative cursor-pointer'>
                        <img src="" alt="user" className='rounded-full w-10 h-10 object-cover' />
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={` flex items-center justify-center gap-2 border border-gray-300 
                        px-2 py-1 rounded-md backdrop-blur-md cursor-pointer hover:shadow-md active:scale-95
                        transition-all ease-in-out duration-150`}
                        onClick={signWithGmail}
                    >
                        <FcGoogle />
                        <p className={`text-base ${color ? 'text-primary' : 'text-gray-200'}`}>
                            Login
                        </p>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
