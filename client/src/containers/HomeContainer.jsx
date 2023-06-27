import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BannerImage2 } from '../assets';
import { fetchFeeds } from '../sanity';
import { SET_FEED } from '../context/actions/feedActions';
import { Spinner } from '../components';

const HomeContainer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const feeds = useSelector((state) => state.feeds);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!feeds) {
            setIsLoading(true);
            fetchFeeds().then((data) => {
                console.log("Home component: fetch data: ", data);
                dispatch(SET_FEED(data));

                setInterval(() => {
                    setIsLoading(false);
                }, 2000);
            });
        }
    }, []);

    return (
        <div className='w-full h-[5000px]'>
            <div className='w-screen h-420 flex items-center justify-center relative'>
                <img src={BannerImage2} alt="banner" className='w-full h-full object-cover' />
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    some posts
                </div>
            )}
        </div>
    );
};

export default HomeContainer;
