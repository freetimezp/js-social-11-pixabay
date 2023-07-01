import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Header, MainLoader, FeedDetail } from './components';
import { HomeContainer, NewPost, SearchContainer } from './containers';

import { firebaseAuth } from './config/firebase.config';
import { createNewUser } from './sanity';

import { SET_USER } from './context/actions/userActions';

import './App.css';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //setIsLoading(true);

    onAuthStateChanged(firebaseAuth, result => {
      console.log("App i here :", result);

      if (result) {
        //console.log("User", result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          //console.log("new user created");
          dispatch(SET_USER(result?.providerData[0]));

          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <Header />

          <main className='w-full h-full flex items-center justify-center'>
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
              <Route path="/newPost/*" element={<NewPost />} />
              <Route path="/feed-detail/:_id" element={<FeedDetail />} />
              <Route path="/search/:searchTerm" element={<SearchContainer />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;