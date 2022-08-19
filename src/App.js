import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//Pages
import Home from './pages/home.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';

function App() {
  return (
    <div className="App">
      <Router> {/* Browser Router */}
        <Routes> {/* Switch */}
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
