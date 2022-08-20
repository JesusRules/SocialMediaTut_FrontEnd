import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Components
import Navbar from './components/Navbar.js'

//Pages
import Home from './pages/home.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: "#ff6333",
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true
  }
})

function App() {
  return (
    <ThemeProvider  theme={theme}>
      <div className="App">
      <Router> {/* Browser Router */}
      <Navbar />
      <div className="container">
        <Routes> {/* Switch */}
          <Route path='/' element={<Home />} />
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
