import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage';
import { MainApp } from './pages/MainApp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/:username' element={<MainApp/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;