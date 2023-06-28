import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/bundle";
import "../assets/css/swiperStyles.css";
import { categoriesList } from '../utils/supports';

import { BiCloudUpload } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { AiOutlineClear, AiFillCloseCircle } from 'react-icons/ai';
import { Spinner } from '../components';
import { deleteUploadedAsset, savePost, uploadAsset } from '../sanity';
import { useSelector } from 'react-redux';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [asset, setAsset] = useState(null);
    const [alert, setAlert] = useState(null);
    const [keywords, setKeywords] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");

    const user = useSelector(state => state.user);
    //console.log(user);

    const handleFileSelect = async (event) => {
        setIsLoading(true);
        const file = event.target.files[0];
        //console.log(file);

        if (file && isAllowed(file)) {
            await uploadAsset(file).then((data) => {
                //console.log("Asset upload:", data);
                setAsset(data);

                setInterval(() => {
                    setIsLoading(false);
                }, 3000);
            });
        } else {
            setIsLoading(false);
            setAsset(null);
            setAlert("Invalid file type. Try another file..");

            setInterval(() => {
                setAlert(null);
            }, 3000);
        }
    };

    const isAllowed = (file) => {
        const allowedTypes = [
            "audio/mp3",
            "video/avi",
            "video/mp4",
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif",
        ];

        return allowedTypes.includes(file.type);
    }

    const deleteAsset = async (id) => {
        setIsLoading(true);

        await deleteUploadedAsset(id).then((data) => {
            setAsset(null);

            setInterval(() => {
                setIsLoading(false);
            }, 3000);
        });
    }

    const handleKeyUp = async (event) => {
        if (event.key === "Enter") {
            setTags(keywords.split(","));
            setKeywords("");
            //console.log(tags);
        }
    }

    const saveData = async () => {
        if (!title || !asset || !category || !tags) {
            setAlert("Required fields are missing..");
            setInterval(() => {
                setAlert(null);
            }, 2000);
        } else {
            if (asset?.mimeType.split("/")[0] === "image") {
                //create post for saving
                const doc = {
                    _type: "post",
                    title: title,
                    keywords: tags,
                    description: description,
                    filesource: asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
                    mainImage: {
                        _type: "mainImage",
                        asset: {
                            _type: "reference",
                            _ref: asset?._id,
                        }
                    },
                    categories: category,
                    users: {
                        _type: "reference",
                        ref: user?.uid,
                    }
                };

                //save post to sanity
                await savePost(doc).then(() => {
                    //clear all fields after saving
                    setTitle("");
                    setCategory(null);
                    setKeywords("");
                    setTags([]);
                    setDescription("");
                    setAsset(null);
                    setAlert("Data saved");

                    setInterval(() => {
                        setAlert(null);
                    }, 3000);
                });
            } else {
                //create post for saving
                const doc = {
                    _type: "post",
                    title: title,
                    keywords: tags,
                    description: description,
                    filesource: asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
                    otherMedia: {
                        _type: "otherMedia",
                        asset: {
                            _type: "reference",
                            _ref: asset?._id,
                        }
                    },
                    categories: category,
                    users: {
                        _type: "reference",
                        _ref: user?.uid,
                    }
                };

                //save post to sanity
                await savePost(doc).then(() => {
                    //clear all fields after saving
                    setTitle("");
                    setCategory(null);
                    setKeywords("");
                    setTags([]);
                    setDescription("");
                    setAsset(null);
                    setAlert("Data saved");

                    setInterval(() => {
                        setAlert(null);
                    }, 3000);
                });
            }
        }
    }

    return (
        <div className='w-full h-auto items-center justify-start flex-col gap-4'>
            {/* alert notification */}
            {alert && (
                <div className='w-full px-4 py-3 rounded-md bg-red-100 shadow-inner 
                    flex items-center justify-center mb-4'>
                    <p className='text-xl text-red-800 font-medium'>
                        {alert}
                    </p>
                </div>
            )}

            {/* title */}
            <input
                type="text"
                placeholder="Your post title type here"
                className='w-full px-4 py-3 rounded-md border border-gray-300 shadow-inner 
                text-lg text-primary font-semibold focus:border-blue-500 outline-none'
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
                            <p className='text-base text-primary cursor-pointer'>{value.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* file upload */}
            <div className='w-full bg-gray-100 backdrop-blur-md h-370 rounded-md border-2 
                border-dotted border-gray-300 cursor-pointer flex items-center justify-center'>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {!asset ? (
                            <label className='w-full h-full cursor-pointer'>
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <div className='flex flex-col justify-center items-center cursor-pointer'>
                                        <p className='font-bold text-3xl'>
                                            <BiCloudUpload />
                                        </p>
                                        <p className='text-lg'>
                                            Click to Upload
                                        </p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className='w-0 h-0'
                                    accept=".mp3, .avi, .mp4, .jpeg, .jpg, .png, .gif"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        ) : (
                            <>
                                {asset && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(asset.mimeType)
                                    && (
                                        <img
                                            src={asset?.url}
                                            alt="user upload"
                                            className='w-full h-full object-cover'
                                        />
                                    )}
                                {asset && ["audio/mp3", "video/avi", "video/mp4",].includes(asset.mimeType)
                                    && (
                                        <video
                                            src={asset?.url}
                                            className='w-full h-full object-cover'
                                            controls
                                        />
                                    )}
                            </>
                        )}
                    </>
                )}

                {asset && (
                    <div
                        className='w-12 h-12 rounded-full flex items-center justify-center bg-red-400 
                        hover:bg-red-600 cursor-pointer absolute top-5 right-5 duration-200 transition-all'
                        onClick={() => deleteAsset(asset?._id)}
                    >
                        <FaTrash className="text-base text-white" />
                    </div>
                )}
            </div>

            {/* keywords section */}
            <div className='w-full flex flex-col items-center justify-center gap-4 mt-4'>
                <div className='w-full flex flex-col items-center justify-center gap-4 relative'>
                    <input
                        type="text"
                        placeholder='Type your Tags here separated by comma'
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className='w-full px-4 py-3 rounded-md border border-gray-300 shadow-inner
                        text-lg text-primary font-semibold focus:border-blue-500 outline-none'
                        onKeyUp={handleKeyUp}
                    />
                    <AiOutlineClear
                        className='absolute top-7 right-3 text-2xl text-primary cursor-pointer 
                        hover:scale-110 hover:text-red-700 transition-all duration-150'
                        onClick={() => {
                            setKeywords("");
                            setTags([]);
                        }}
                    />
                </div>
                {tags.length > 0 && (
                    <div className='w-full h-auto p-4 flex items-center justify-start flex-wrap border
                    border-dashed rounded-md border-gray-300 gap-4'>
                        {tags?.map((tag, i) => (
                            <div
                                key={i}
                                className='flex items-center justify-center gap-2 px-2 py-1 rounded-md
                                border border-gray-300 border-dashed shadow-inner hover:bg-gray-200 
                                cursor-pointer'
                            >
                                <p>
                                    {tag}
                                </p>
                                <AiFillCloseCircle
                                    className='text-lg text-primary cursor-pointer'
                                    onClick={() => {
                                        setTags(tags.filter((value) => value !== tag))
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* description */}
            <textarea
                type="text"
                rows={6}
                cols={1}
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full px-4 py-3 rounded-md border border-gray-300 shadow-inner
                text-lg text-primary font-semibold focus:border-blue-500 outline-none mt-4'
            >

            </textarea>

            {/* button */}
            <div className='w-full flex items-center'>
                <button
                    className='px-4 py-2 rounded-md bg-blue-500 text-lg  
                    cursor-pointer hover:bg-blue-600 text-white w-full lg:w-60
                    ml-auto transition-all duration-300'
                    onClick={saveData}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
