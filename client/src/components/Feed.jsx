import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdBookmarks } from 'react-icons/md';

const Feed = ({ data }) => {
    const [alreadySaved, setAlreadySaved] = useState(null);

    return (
        <div className='m-2 relative'>
            <div className='relative cursor-pointer w-auto rounded-lg shadow-md overflow-hidden'>
                {/* if show image */}
                {data?.mainImage && (
                    <Link
                        to={`/feed-detail/${data?._id}`}
                        className='w-full h-full'
                    >
                        <img
                            src={data?.mainImage.asset.url}
                            alt="post"
                            className='w-full h-full object-cover'
                        />
                    </Link>
                )}

                {/* if show video */}
                {data?.otherMedia && (
                    <Link
                        to={`/feed-detail/${data?._id}`}
                        className='w-full h-full'
                    >
                        <video
                            src={data?.otherMedia.asset.url}
                            className='w-full h-full object-cover'
                            loop
                            autoPlay
                            muted
                        />
                    </Link>
                )}

                <div className='absolute inset-x-0 top-0 px-3 py-2 flex items-center'>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center border 
                        ${alreadySaved ? 'border-emerald-300' : 'border-gray-100'}`}>
                        <MdBookmarks
                            className={`text-xl text-gray-100 ${alreadySaved && 'text-emerald-400'}`}
                        />
                    </div>
                </div>

                {data?.keywords && (
                    <div className='absolute inxet-x-0 bottom-0 px-3 py-2 flex items-center gap-1 
                            bg-gradient-to-bl from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] 
                            flex-wrap backdrop-blur-sm w-full'>
                        {data?.keywords?.slice(0, 3).map((tag, i) => (
                            <p
                                key={i}
                                className='text-sm font-semibold text-gray-50'
                            >
                                {`${tag.length > 10 ? `${tag.slice(1, 10)}...` : tag}`}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
