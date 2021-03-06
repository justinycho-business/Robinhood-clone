import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Stocks from './components/Stocks'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Dashboard from './components/Dashboard';

import Home from './components/Home';
import API from './components/API'

import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

import { authenticate } from './store/session';
import './components/styles/App.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar className='NavBar'/>
      <Switch className='Switch'>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/stocks/:ticker' exact={true}>
          <Stocks />
        </Route>
        <ProtectedRoute path='/dashboard/:userId' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Home />
        </Route>
        <Route path='/stocks/justinpage' exact={true} >
          <API />
        </Route>
        <Route path='/about-us' exact={true}>
          <AboutUs />
        </Route>
      </Switch>
      <Footer className='Footer'/>
    </BrowserRouter>
  );
}

export default App;
