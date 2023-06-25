import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase.config';
import { createNewUser } from '../sanity';

import { useDispatch, useSelector } from 'react-redux';
import { SET_USER, SET_USER_NULL } from '../context/actions/userActions';

import { Logo } from '../assets';
import { mainMenu } from '../utils/supports';

const Header = () => {
    const [color, setColor] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const navigate = useNavigate();

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
            //console.log(result.user.providerData[0]);
            createNewUser(result?.user?.providerData[0]).then(() => {
                //console.log("new user created");
                dispatch(SET_USER(result?.user?.providerData[0]));
            });
        })
    }

    const logOut = async () => {
        await firebaseAuth.signOut().then(() => {
            dispatch(SET_USER_NULL());
            navigate('/', { replace: true });
        });
    }

    return (
        <header className={`fixed inset-x-0 px-8 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between
            z-50 translate-all duration-500 ${color ? 'bg-white/80' : 'bg-transparent'}`}>
            <Link to={"/"}>
                <img
                    src={Logo} alt="logo"
                    className="w-24 h-auto object-contain"
                />
            </Link>

            <div className='flex items-center justify-center gap-4'>
                {user ? (
                    <>
                        <div className='relative cursor-pointer'>
                            <img
                                src={user?.photoURL} alt="user"
                                className='rounded-full w-10 h-10 object-cover'
                                referrerPolicy='no-referrer'
                                onClick={() => setIsMenu(!isMenu)}
                            />

                            {isMenu && (
                                <div
                                    className='absolute right-0 top-12 rounded-md shadow-md w-64 px-4 py-3 
                                    bg-[#191b26] flex flex-col items-start justify-center gap-3'
                                    onMouseLeave={() => setIsMenu(false)}
                                >
                                    <h2 className='text-gray-50 font-semibold'>
                                        {user?.displayName}
                                    </h2>
                                    <div className='w-full h-[1px] bg-gray-700'></div>

                                    {mainMenu && mainMenu.map((menu, i) => (
                                        <Link
                                            to={`/newPost/${menu.slug}`}
                                            key={i}
                                            className='text-base text-gray-300 transition-all duration-300 
                                                                        hover:pl-1 hover:text-blue-300'
                                        >
                                            {menu?.name}
                                        </Link>
                                    ))}
                                    <div className='w-full h-[1px] bg-gray-700'></div>

                                    <p className='text-xl text-gray-300' onClick={logOut}>
                                        Logout
                                    </p>
                                </div>
                            )}
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

                {user && (
                    <Link
                        to="/newPost/upload"
                        className='px-4 py-2 rounded-full text-base font-semibold text-primary cursor-pointer
                            bg-emerald-200 shadow-md active:scale-95 hover:bg-emerald-300 transition-all
                            duration-300'
                    >
                        Upload
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
