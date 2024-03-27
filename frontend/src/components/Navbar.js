import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/authSlice';
import Logo from '../images/beehyvlogo.png';
import NotificationComponent from './Notification';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsBell } from 'react-icons/bs';
import axios from 'axios';
import urls from './Api_Urls';
import { Badge } from 'react-bootstrap';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { token, user, is_user, username } = useSelector(state => state.auth);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = async () => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };

    const res=await axios.get(urls.get_notifications,config)
    setNotifications(res.data);
  };
  const submitHandler = () => {
    dispatch(logoutUser());
  };

  return (
          <>
               {token == null ? (
                          <nav className="navbar navbar-expand-lg" style={{
                            background: 'rgb(44,107,122)',
                            background: 'linear-gradient(51deg, rgba(44,107,122,1) 0%, rgba(9,121,61,1) 0%, rgba(81,143,7,1) 0%, rgba(6,161,129,1) 19%, rgba(0,236,255,1) 100%)',
                            color: 'white',
                          }}>
                            <marquee className="text-dark opacity-75 h4" style={{ margin: 0 }}>
                              Welcome to Beehyv Project Allocation site
                            </marquee>
                          </nav>
                        ) : (


                          <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between align-items-center">
                          <Container fluid>
                            <Navbar.Brand href="/home">
                              <img src={Logo} alt="Logo" className="logo-image mx-3" style={{ maxWidth: '100px', minWidth: '25px' }} />
                            </Navbar.Brand>
                           {!is_user && <Nav.Link href='/emps' className="me-auto my-2 my-lg-0 nav-link-hover p-2">Employees</Nav.Link>}
                        
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                              <Nav className="ms-auto align-items-center" navbarScroll>
                                <span className="mx-3" dangerouslySetInnerHTML={{ __html: `Hello &#128075; ${username}` }}></span>
                        
                                <NavDropdown
                                        title={<BsBell />}
                                        onClick={handleNotificationClick}
                                        id="navbarScrollingDropdown"
                                        align="start"
                                        className="dropdown-menu-left"
                                        
                                      >
                                         
                                        {notifications.length > 0 ? (
                                          notifications.map((notification, index) => (
                                            <span key={index} className="dropdown-item-text">{notification.message}</span>
                                          ))
                                        ) : (
                                          <span>No new notifications</span>
                                        )}
                                      </NavDropdown><Badge bg="secondary">9</Badge>
                        
                                <Nav.Link href='/emps' className="mx-3 nav-link-hover" onClick={submitHandler}>Log out</Nav.Link>
                              </Nav>
                            </Navbar.Collapse>
                          </Container>
                        </Navbar>
                      
                      
                    )}
          </>
     
          )
  }


export default NavbarComponent;


{/* <Form className="d-flex">
<Form.Control
  type="search"
  placeholder="Search"
  className="me-2"
  aria-label="Search"
/>
<Button variant="outline-success">Search</Button>
</Form> */}