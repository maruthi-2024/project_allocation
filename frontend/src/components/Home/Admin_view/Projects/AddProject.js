import React, { useEffect, useState } from 'react';
import urls from '../../../Api_Urls';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    starting_date: '',
    deadline: '',
    lead: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(formData);
    try {
      const res = await axios.post(urls.create_proj, formData, config);
      console.log(res)
      if (res) {
        navigate("/home");
      }
    } catch (err) {
      alert(`Error msg in creating projects:${err}`);
    }
  };


  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create New Project</h5>
              <form id="projectForm">
                <div className="mb-3 row">
                  <label htmlFor="titleInput" className="col-sm-4 col-form-label">Title</label>
                  <div className="col-sm-8">
                    <input onChange={handleChange} type="text" className="form-control" id="titleInput" name="title" required />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="descriptionInput" className="col-sm-4 col-form-label">Description</label>
                  <div className="col-sm-8">
                    <textarea onChange={handleChange} className="form-control" id="descriptionInput" rows={3} name="description" required></textarea>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="startDateInput" className="col-sm-4 col-form-label">Starting Date</label>
                  <div className="col-sm-8">
                    <input onChange={handleChange} type="date" className="form-control" id="startDateInput" name="starting_date" required />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="deadlineInput" className="col-sm-4 col-form-label">Deadline</label>
                  <div className="col-sm-8">
                    <input onChange={handleChange} type="date" className="form-control" id="deadlineInput" name="deadline" min={formData.starting_date} required />
                  </div>
                </div>
                {/* <div className="mb-3 row">
                  <label htmlFor="leadInput" className="col-sm-4 col-form-label">Lead</label>
                  <div className="col-sm-8">
                    <input onChange={handleChange} type="text" className="form-control" id="leadInput" name="lead" required />
                  </div>
                </div> */}
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
