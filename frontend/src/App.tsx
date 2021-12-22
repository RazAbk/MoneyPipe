import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage';
import { MainApp } from './pages/MainApp';
import { Loader } from './components/Loader';
import { PaginationDots } from './components/PaginationDots';



function App() {
  return (
    <Router>
      <Loader />
      <Routes>
        <Route path='/mydata' element={<MainApp />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
      <PaginationDots />
    </Router>
  );
}

export default App;
