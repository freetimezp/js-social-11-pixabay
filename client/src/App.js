import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { HomeContainer } from './containers';

import './App.css';

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
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