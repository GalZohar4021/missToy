import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux';

import { store } from './store/store';

import './assets/css/main.css';

import logo from './logo.svg';


import { AppHeader } from './cmps/app-header';
import { ToysIndex } from './pages/toy-index';
import { ToyEdit } from './pages/toy-edit';
import { ToyDetails } from './pages/toy-details';
import { UserDetails } from './pages/user-details';

import { Home } from './pages/home'
import { About } from './pages/about'
import { Dashboard } from './pages/dashboard';
import { Shops } from './cmps/shops';
import { Reviews } from './cmps/reviews';
import { UserReviews } from './cmps/user-reviews';
import { ChatUser } from './cmps/chat-user';

function App() {
  return (
    <Provider store={store}>
      <Router>

        <div className="App">
          <AppHeader />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<ToysIndex />} path="/toy" />
            <Route element={<ToyEdit />} path='/toy/edit' />
            <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
            <Route element={<ToyDetails />} path='toy/:toyId' />

            <Route element={<UserDetails />} path='user/:userId'>
              <Route element={<UserReviews />} path='/user/:userId/reviews' />
              <Route element={<div></div>} path='/user/:userId/details' />
              <Route element={<ChatUser />} path='/user/:userId/chat' />

            </Route>

            <Route element={<About />} path='/about'>
              {/* <Route element={<AboutIndex />} path='/about' /> */}
              <Route element={<Dashboard />} path='/about/dashboard' />
              <Route element={<Shops />} path='/about/shops' />

            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
