import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//Redux
import { Provider } from 'react-redux';
import store, {persistor} from './redux/store.js';
import {PersistGate} from 'redux-persist/integration/react'

//Components
import Navbar from './components/Navbar.js'
import AuthRoute from './util/AuthRoute.js'

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
      <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />} />
          
          <Route element={<AuthRoute authenticated={authenticated} />}>
            <Route path='/login' element={<Login />}/>
          </Route>

          <Route element={<AuthRoute authenticated={authenticated} />}>
            <Route path='/signup' element={<Signup />} />
          </Route>

          {/* {/* <AuthRoute exact path='/login' element={<Login />} authenticated={authenticated}/> */}
        </Routes>
      </div>
      </Router>
      {/* </PersistGate> */}
    </Provider>
    </ThemeProvider >
  );
}

export default App;
