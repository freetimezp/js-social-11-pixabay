import React, { useEffect, useState } from 'react';

import { NewPostBg } from '../assets';
import { useParams } from 'react-router-dom';
import { addToCollection, fetchFeedDetail, fetchFeeds } from '../sanity';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdBookmarks } from 'react-icons/md';
import MasonaryLayout from './MasonaryLayout';
import { Comments, Filter } from '../components';
import { SET_FEED } from '../context/actions/feedActions';

const FeedDetail = () => {
    const [feed, setFeed] = useState(null);
    const [alreadySaved, setAlreadySaved] = useState(null);

    const dispatch = useDispatch();

    const { _id } = useParams();
    const user = useSelector((state) => state.user);
    const feeds = useSelector((state) => state.feeds);

    //console.log(user);
    //console.log(feeds);
    //console.log(alreadySaved);

    const getFeedDetail = async (feedId) => {
        await fetchFeedDetail(feedId).then((data) => {
            setFeed(data[0]);
            //console.log(data[0]);
            if (data[0]?.collections?.filter((item) => item._id === user?.uid)?.length > 0) {
                setAlreadySaved(true);
            } else {
                setAlreadySaved(false);
            }
        });
    }

    useEffect(() => {
        if (!feeds) {
            fetchFeeds().then((data) => {
                //console.log("FeedDetail component: fetch data: ", data);
                dispatch(SET_FEED(data));
            });
        }

        setAlreadySaved(!!feed?.collections?.filter((item) => item._id === user?.uid)?.length);
        getFeedDetail(_id);
        //console.log(feed);
    }, [alreadySaved, _id, feeds, feed]);

    const saveToCollections = async (id, uid) => {
        if (!alreadySaved) {
            await addToCollection(id, uid).then(() => {
                setAlreadySaved(true);
                window.location.reload();
            });
        }
    }

    return (
        <div className='w-screen h-auto flex flex-col items-center justify-center relative'>
            <div className='w-full h-[240px] relative'>
                <img src={NewPostBg} alt="banner" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-overlay-4'></div>
            </div>

            <Filter />

            <div className='w-full grid grid-cols-1 lg:grid-cols-2 px-8 lg:px-12 lx:px-32 
                py-6 gap-4'>
                <div className='flex flex-col items-start justify-start gap-4'>
                    <div className='flex h-auto lg:h-600 xl:h-[800px] items-centter justify-center 
                        flex-col overflow-hidden rounded-md shadow-md'>
                        {/* if show image */}
                        {feed?.mainImage && (
                            <img
                                src={feed?.mainImage.asset.url}
                                alt="post"
                                className='w-full h-full object-cover'
                            />
                        )}

                        {/* if show video */}
                        {feed?.otherMedia && (
                            <video
                                src={feed?.otherMedia.asset.url}
                                className='w-full h-full object-cover'
                                loop
                                autoPlay
                                muted
                            />
                        )}
                    </div>

                    <div className='w-full py-4 flex flex-col items-start justify-start'>
                        <Comments feed={feed} user={user} setFeed={setFeed} />
                    </div>
                </div>
                <div className='flex items-start flex-col justify-start w-full gap-6'>
                    <div className="flex items-center justify-center gap-3">
                        <img
                            src={feed?.users?.photoURL
                                ? feed?.users?.displayName
                                : 'https://picsum.photos/id/237/200/200'}
                            alt="user"
                            className={`w-12 h-12 rounded-full object-cover shadow-md  
                            ${feed?.users?.photoURL ? '' : 'bg-blue-300'}`}
                        />
                        <p className='text-xl text-primary font-semibold'>
                            {feed?.users?.displayName}
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-3'>
                        <div className='flex items-center justify-center gap-2 px-2 py-1 rounded-md 
                            border border-red-200'>
                            <FaHeart className='text-red-500 text-lg' />

                            {feed?.collections?.length > 0 ? (
                                <p className='text-base text-primary font-semibold'>
                                    {feed?.collections?.length}
                                </p>
                            ) : (
                                <p className='text-base text-primary font-semibold'>
                                    0
                                </p>
                            )}
                        </div>

                        <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center border 
                            cursor-pointer 
                            ${alreadySaved
                                    ? 'border-emerald-400'
                                    : 'border-gray-100 bg-gray-300'}`}
                            onClick={() => saveToCollections(feed?._id, user?.uid)}
                        >
                            {alreadySaved ? (
                                <MdBookmarks className='text-xl text-emerald-500' />
                            ) : (
                                <MdBookmarks className='text-xl text-white' />
                            )}
                        </div>
                    </div>

                    {feed?.keywords?.length > 0 && (
                        <p className='text-base text-primary font-semibold'>
                            Tags : {feed?.keywords?.map((tag, i) => (
                                <span
                                    className='px-1 py-[1px] mx-1 rounded-md border border-gray-200 
                                        shadow-xl'
                                    key={i}
                                >
                                    {tag}
                                </span>
                            ))}
                        </p>
                    )}

                    {user && (
                        <>
                            {feed?.mainImage && (
                                <a
                                    href={`${feed?.mainImage?.asset.url}?dl`}
                                    className='w-auto px-16 text-lg text-gray-50 font-semibold py-2 
                                    rounded-full bg-emerald-500 hover:shadow-md hover:bg-emerald-600
                                    transition-all duration-200'
                                >
                                    Free Download
                                </a>
                            )}
                            {feed?.otherMedia && (
                                <a
                                    href={`${feed?.otherMedia?.asset.url}?dl`}
                                    className='w-auto px-16 text-lg text-gray-50 font-semibold py-2 
                                    rounded-full bg-emerald-500 hover:shadow-md hover:bg-emerald-600
                                    transition-all duration-200'
                                >
                                    Free Download
                                </a>
                            )}
                        </>
                    )}

                    <div className='w-full h-[1px] rounded-md bg-gray-300'></div>

                    <p className='text-base text-primary'>
                        {feed?.description}
                    </p>

                    <p className='text-lg text-primary font-semibold'>
                        Suggested Posts
                    </p>

                    <div className='w-full items-center justify-center flex-wrap gap-3'>
                        <MasonaryLayout
                            isSuggestions={true}
                            feeds={feed?.otherMedia
                                ? feeds?.slice(0, 6).filter((item) => item.otherMedia)
                                : feeds?.slice(0, 6).filter((item) => item.mainImage)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className='w-full px-12 xl:px-32 flex flex-col items-start justify-start'>
                <p className='text-xl text-primary font-bold'>
                    Related Posts
                </p>

                <div className='w-full items-center justify-center flex-wrap gap-3'>
                    <MasonaryLayout
                        feeds={feed?.otherMedia
                            ? feeds?.filter((item) => item.otherMedia)
                            : feeds?.filter((item) => item.mainImage)
                        }
                    />
                </div>
            </div>
        </div >
    );
};

export default FeedDetail;
