import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter ,  Routes,  Route,  Link  }   from 'react-router-dom';  
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
      <Layout>
             <Routes>
              <Route exact path='' element={<Login/>}/>
              <Route exact path='/home' element={<Home/>}/>
            </Routes>
      </Layout>
     </BrowserRouter>
      </div>
    );
  }
}

export default App;
