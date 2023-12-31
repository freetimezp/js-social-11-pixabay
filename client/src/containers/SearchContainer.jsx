import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NewPostBg, Sad } from '../assets';
import { Filter, MasonaryLayout, Spinner } from '../components';
import { fetchSearchQuery } from '../sanity';

const SearchContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchFeeds, setSearchFeeds] = useState(null);

    const { searchTerm } = useParams();
    console.log("Search container :", searchTerm);

    useEffect(() => {
        setIsLoading(true);
        fetchSearchQuery(searchTerm).then((data) => {
            //console.log(data);
            setSearchFeeds(data);

            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });
    }, [searchTerm]);

    return (
        <div className='w-screen h-auto flex flex-col items-center justify-center object-cover'>
            <div className='w-full h-340 relative'>
                <img
                    src={NewPostBg}
                    alt="banner search"
                    className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-overlay-4'></div>
            </div>

            <Filter />

            <section className='w-full items-center justify-between flex-wrap gap-3 px-8 py-6'>
                {isLoading ? (
                    <div className='w-full flex items-center justify-center py-12'>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {searchFeeds?.length > 0 ? (
                            <MasonaryLayout feeds={searchFeeds} />
                        ) : (
                            <div className='w-full flex flex-col items-center justify-center gap-3 py-24'>
                                <img src={Sad} alt="sad" className='w-32 object-contain' />
                                <p className='text-xl lg:text-3xl font-bold text-primary'>
                                    Sorry! Nor results found..
                                </p>
                                <p className='text-lg lg:text-xl text-primary'>
                                    We're sorry what you were looking for. Please try another term..
                                </p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default SearchContainer;
