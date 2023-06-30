import React, { useState } from 'react';
import moment from 'moment';

import { Spinner } from '../components';
import { addToComments, fetchFeedDetail, fetchFeeds } from '../sanity';
import { useDispatch } from 'react-redux';
import { SET_FEED } from '../context/actions/feedActions';

const Comments = ({ feed, user, setFeed }) => {
   const [comment, setComment] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [index, setIndex] = useState(5);

   //console.log(feed);

   const dispatch = useDispatch();

   const saveComment = async (event) => {
      if (event.key === "Enter") {
         if (comment) {
            setIsLoading(true);
            addToComments(feed?._id, user?.uid, comment).then(() => {
               fetchFeedDetail(feed?._id).then((newData) => {
                  setFeed(newData[0]);
                  console.log(newData[0]);

                  fetchFeeds().then((data) => {
                     dispatch(SET_FEED(data));
                  });

                  setInterval(() => {
                     setComment("");
                     setIsLoading(false);
                  }, 2000);
               })
            });
         }
      }
   }

   return (
      <div className='w-full flex flex-col items-start justify-start gap-2'>
         <p className='text-lg text-primary font-semibold'>Comments</p>

         <div className='w-full flex gap-3 items-center justify-start mb-4'>
            <img
               src='https://picsum.photos/id/237/200/200'
               alt="user"
               className='w-16 h-16 rounded-full object-cover shadow-md'
            />
            <input
               type="text"
               value={comment}
               placeholder='Add your comment'
               className='w-full p-2 h-[60px] rounded-md shadow-inner text-base text-primary 
                    border border-gray-300 focus:border-blue-300 outline-none'
               onChange={(e) => setComment(e.target.value)}
               onKeyDown={saveComment}
            />
         </div>

         <div className='w-full flex flex-col items-center justify-center gap-2'>
            {isLoading ? (
               <Spinner />
            ) : (
               <>
                  {feed?.comments ? (
                     <>
                        {feed?.comments?.slice(0, index).map((msg, i) => (
                           <div className='w-full flex gap-3 items-start justify-start' key={i}>
                              <img
                                 src={msg?.users?.photoURL
                                    ? msg?.users?.photoURL
                                    : 'https://picsum.photos/id/202/200/200'}
                                 className='w-16 h-16 rounded-full object-cover shadow-md'
                                 alt="user"
                              />
                              <div className='flex w-full flex-col items-start justify-start gap-2'>
                                 <div className='flex w-full items-center justify-between'>
                                    <p className='text-lg text-primary font-semibold'>
                                       {msg?.users?.displayName}
                                    </p>
                                    <p className='font-semibold'>
                                       {moment(`${new Date(msg?._createdAt).toLocaleDateString()} 
                                          ${new Date(msg?._createdAt).toLocaleTimeString()}`,
                                          "DD/MM/YYYY h:mm:ss A").fromNow()}
                                    </p>
                                 </div>
                                 <p className='text-base text-primary'>{msg?.comment}</p>
                              </div>
                           </div>
                        ))}
                     </>
                  ) : (
                     <p>
                        No comments yet
                     </p>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default Comments;
