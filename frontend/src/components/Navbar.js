import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/authSlice';
import Logo from '../images/beehyvlogo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.auth);

  const submitHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
      background: 'rgb(44,107,122)',
      background: 'linear-gradient(51deg, rgba(44,107,122,1) 0%, rgba(9,121,61,1) 0%, rgba(81,143,7,1) 0%, rgba(6,161,129,1) 19%, rgba(0,236,255,1) 100%)'
    }}>
      {token == null && (
        <marquee className="text-primary opacity-50 h4" style={{ margin: 0 }}>
          Welcome to Beehyv Project Allocation site
        </marquee>
      )}
      {token != null && (
        <div className="container-fluid d-flex justify-content-between align-items-center ">
           <img src={Logo} alt="Logo" className="logo-image mr-3" style={{ maxWidth: '100px', minWidth: '25px' }} />

          <div className=''>
            <span className="mx-3" dangerouslySetInnerHTML={{ __html: user != null && `Hello &#128075; ${user.username}` }}></span>
            <Link className="btn " onClick={submitHandler}>Log out</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
