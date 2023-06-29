import React, { useState } from 'react';

import { Spinner } from '../components';

const Comments = ({ feed, user, setFeed }) => {
   const [comment, setComment] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [index, setIndex] = useState(5);

   //console.log(feed);

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
            // onKeyDown={saveComment}
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
                                 </div>
                              </div>
                           </div>
                        ))}
                     </>
                  ) : (
                     <>
                        No comments yet
                     </>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default Comments;
