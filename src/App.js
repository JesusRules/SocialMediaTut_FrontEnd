import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//Components
import Navbar from './components/Navbar.js'

//Pages
import Home from './pages/home.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';

const theme = createTheme(themeFile)

const token = localStorage.FBIdToken;

let authenticated;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
  
}

function App() {
  return (
    <ThemeProvider  theme={theme}>
      <div className="App">
      <Router> {/* Browser Router */}
      <Navbar />
      <div className="container">
        <Routes> {/* Switch */}
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      </Router>
    </div>
    </ThemeProvider >
  );
}

export default App;
