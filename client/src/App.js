import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { HomeContainer } from './containers';

import { firebaseAuth } from './config/firebase.config';
import { createNewUser } from './sanity';

import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(result => {
      if (result) {
        //console.log("User", result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          //console.log("new user created");
          dispatch(SET_USER(result?.providerData[0]));
        });
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      <Header />

      <main className='w-full h-full flex items-center justify-center'>
        <Routes>
          <Route path="/*" element={<HomeContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;