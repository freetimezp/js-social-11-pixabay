import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/bundle";
import "../assets/css/swiperStyles.css";
import { categoriesList } from '../utils/supports';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    return (
        <div className='w-full h-auto items-center justify-start flex-col gap-4'>
            {/* alert notification */}



            {/* title */}
            <input
                type="text"
                placeholder="Your post title type here"
                className='w-full px-4 py-3 rounded-md border border-gray-300 shadow-inner 
                text-lg text-primary font-semibold focus:border-blue-400 outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* categories section */}
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                centeredSlides={false}
                slidesPerView={8}
                className='mySwiper'
            >
                {categoriesList && categoriesList?.map((value, i) => (
                    <SwiperSlide key={i} className='py-4'>
                        <div
                            className={`px-2 py-1 flex items-center justify-center rounded-md border 
                            border-gray-200 shadow-inner hover:shadow-lg hover:shadow-blue-200
                            ${category === value.name && "bg-blue-100"}`}
                            onClick={() => setCategory(value.name)}
                        >
                            <p>{value.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>



            {/* file upload */}



            {/* keywords section */}



            {/* description */}



            {/* button */}
        </div>
    );
};

export default CreatePost;
