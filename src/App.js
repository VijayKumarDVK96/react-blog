import React from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ManageBlog from './pages/ManageBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';

import Header from './components/Header';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-blog' element={<ManageBlog/>}/>
          <Route path='/edit-blog/:id' element={<ManageBlog/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App