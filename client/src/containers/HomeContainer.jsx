import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFeeds } from '../sanity';
import { SET_FEED } from '../context/actions/feedActions';
import { Banner, Spinner, MasonaryLayout, Filter } from '../components';

const HomeContainer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const feeds = useSelector((state) => state.feeds);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!feeds) {
            setIsLoading(true);
            fetchFeeds().then((data) => {
                //console.log("Home component: fetch data: ", data);
                dispatch(SET_FEED(data));

                setInterval(() => {
                    setIsLoading(false);
                }, 2000);
            });
        }
    }, []);

    //console.log("Home container:", feeds);

    return (
        <div className='w-full h-[5000px]'>
            <Banner />

            <Filter />

            {/* {isLoading ? (
                <div className='w-full p-12 flex items-center justify-center'>
                    <Spinner />
                </div>
            ) : ( */}
            <div className='w-full flex items-center justify-between flex-wrap gap-3 px-8 py-6'>
                <MasonaryLayout feeds={feeds} />
            </div>
            {/* )} */}
        </div>
    );
};

export default HomeContainer;
