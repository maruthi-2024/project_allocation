import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import urls from './Api_Urls';

const Admin_Project_view = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [skills, setSkills] = useState([])
  const { token, user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const project = location ? location.state ? location.state.project : null : null;
  if (token == null) return <Navigate to="/login" />;



  const expLevel = {
    "BG": "Beginner",
    "IN": "Intermediate", "EX": "Expert"
  }
  const handleEditSkill = (index, value) => {
    const edited = [...skills];
    edited[index].expertiseLevel = value;
    edited[index].expertise_level = expLevel[value]
    setSkills(edited);
  };

  const handleSaveSkills = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      skills.map(async skill => { await axios.put(urls.get_proj_skills + project.id, skill, config) })
      setIsEditing(false)
    } catch (err) {
      alert(`Error saving skills: ${err}`);
    }
  };

  const toggleAccordion = () => {
    async function fetchEmployeeSkills() {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        try {
          console.log(urls.get_proj_skills + project.id)
          const res = await axios.get(urls.get_proj_skills + project.id, config);
          console.log(res.data)
          setSkills(res.data)
        } catch (err) {
          alert(`Error msg in fetching user skills:${err} `);
        }
      }
    }
    fetchEmployeeSkills();
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div>
      <h2>{project.title}</h2>
      {console.log(token)}
      <div className="container-fluid full-body">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-5 col-sm-6 col-xs-12">
            <div className='card p-2 mt-3 mx-2 border'>
              <h2 className='bg-info rounded  '>Project Details</h2>
              <table className="table  table-borderless text-start">
                <tbody>
                  <tr>
                    <td><b>Title</b></td>
                    <td>: {project.title}</td>
                  </tr>
                  <tr>
                    <td><b>Description</b></td>
                    <td>: {project.description}</td>
                  </tr>
                  <tr>
                    <td><b>Start Date</b></td>
                    <td>: {project.starting_date}</td>
                  </tr>
                  <tr>
                    <td><b>Deadline</b></td>
                    <td>: {project.deadline}</td>
                  </tr>
                </tbody>

              </table>
              <div className="accordion accordion-flush col-8" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className={`accordion-button ${isAccordionOpen ? '' : 'collapsed'}`}
                      type="button"
                      onClick={toggleAccordion}
                      aria-expanded={isAccordionOpen}
                      aria-controls="flush-collapseOne"
                    >
                      Required skills
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className={`accordion-collapse collapse ${isAccordionOpen ? 'show' : ''}`}
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <table className="table table-borderless small" ><tbody>
                        {skills && skills.map((skill, index) => (
                          <><tr key={skill.id}>
                            <td>{skill.skill_info.skill}</td>
                            <td>
                              {isEditing ? (
                                <select
                                  value={skill.expertiseLevel}
                                  onChange={(e) => handleEditSkill(index, e.target.value)}
                                >
                                  <option value="BG">Beginner</option>
                                  <option value="IN">Intermediate</option>
                                  <option value="EX">Expert</option>
                                </select>
                              ) : (
                                skill.expertise_level
                              )}
                            </td>
                          </tr></>
                        )
                        )}
                        <tr>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            {isEditing ? (
                              <button type="button" onClick={handleSaveSkills}>
                                Save
                              </button>
                            ) : (
                              <button type="button" onClick={() => setIsEditing(true)}>
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card p-2 mt-3 mx-2  bg-primary ">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_Project_view