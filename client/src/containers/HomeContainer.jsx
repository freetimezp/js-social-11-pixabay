import React from 'react';

import { BannerImage2 } from '../assets';

const HomeContainer = () => {
    return (
        <div className='w-full h-[5000px]'>
            <div className='w-screen h-420 flex items-center justify-center relative'>
                <img src={BannerImage2} alt="banner" className='w-full h-full object-cover' />
            </div>
        </div>
    );
};

export default HomeContainer;
