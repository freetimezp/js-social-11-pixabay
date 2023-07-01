import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeds } from '../sanity';
import { SET_FEED } from '../context/actions/feedActions';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';

const Collections = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState([]);

    const dispatch = useDispatch();
    const feeds = useSelector((state) => state.feeds);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!feeds) {
            setIsLoading(true);

            fetchFeeds().then((data) => {
                dispatch(SET_FEED(data));

                setInterval(() => {
                    setIsLoading(false);
                }, 2000);
            });
        }
    }, []);

    useEffect(() => {
        if (feeds && saved.length === 0) {
            feeds?.map((feed) => {
                feed?.collections?.map((colc) => {
                    if (colc._id === user?.uid) {
                        setSaved((prevArray) => [...prevArray, feed]);
                    }
                })
            });
        }
    }, []);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-start'>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='w-full items-center justify-between flex-wrap gap-3'>
                    <MasonaryLayout feeds={saved} />
                </div>
            )}
        </div>
    );
};

export default Collections;
