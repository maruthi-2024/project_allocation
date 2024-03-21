import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap'; // Assuming you have installed react-bootstrap
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import urls from './Api_Urls';
import axios from 'axios';

const AddProject = () => {
    const { token, user } = useSelector((state) => state.auth);
    if (token == null) return <Navigate to="/login" />;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    starting_date: '',
    deadline: '',
    lead:''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    // formData.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.post(urls.create_proj, formData,config);
    } catch (err) {
      alert(`Error msg in creating projects:${err}`);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container d-flex justify-content-center">
        <div className='card mt-5 col-lg-10 col-xs-12'>
      <h1 className='my-2'>Create New Project</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="starting_date">
          <Form.Label>Starting Date</Form.Label>
          <Form.Control type="date" name="starting_date" value={formData.starting_date} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="deadline"> 
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> 

      {/* <Form.Group controlId="selectedEmployees">
          <Form.Label>Select Employees</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Employees
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEmployeeSelect(['John Doe'])}>John Doe</Dropdown.Item>
              <Dropdown.Item onClick={() => handleEmployeeSelect(['Jane Smith'])}>Jane Smith</Dropdown.Item>
             </Dropdown.Menu>
          </Dropdown>
        </Form.Group> */}
    </div>
    </div>
  );
};


export default AddProject;