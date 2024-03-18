import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
