import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import urls from './Api_Urls';

const Admin_Project_view = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);  //Initialize skillOptions state

  const location = useLocation();
  const project = location?.state?.project || null;


  const expLevel = {
           "BG": "Beginner",
           "IN": "Intermediate",
           "EX": "Expert"
       }

  if (token == null) return <Navigate to="/login" />;

  const handleEditSkill = (index, event) => {
    const { name, value,id } = event.target;
    console.log(name,"n", value,"v", id, "------");
    const edited = [...skills];
    if (name === "skill") {
      let id = ''; // Initialize id variable
  if (event.target.selectedOptions) {
    id = event.target.selectedOptions[0].getAttribute('id'); // Get the id attribute of the selected option
  }
  console.log("in name skill",id,"i",name,"n",value,"v")
      edited[index].skill_info.skill = value;
      edited[index].skill_info.id = id;
      edited[index].skill = id
    } else {
      edited[index].expertiseLevel = value;
      edited[index].expertise_level = expLevel[value];
    }
    setSkills(edited);
  };

  const handleSaveSkills = async () => {
    console.log(skills)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await Promise.all(skills.map((skill) => axios.put(urls.get_proj_skills + project.id, skill, config)));
      setIsEditing(false);
    } catch (err) {
      alert(`Error in saving skills: ${err}`);
    }
  };

  const handleAddSkills = () => {
    setSkills([
      ...skills,
      {
        project: project.id,
        skill_info: { skill: '', id: null },
        expertiseLevel: 'BG',
        expertise_level: 'Beginner',
      },
    ]);

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
          const res = await axios.get(urls.get_proj_skills + project.id, config);
          setSkills(res.data);
        } catch (err) {
          alert(`Error in fetching project skills: ${err}`);
        }
      }
    }

    !isAccordionOpen && fetchEmployeeSkills();
    setIsAccordionOpen(!isAccordionOpen);
  };

  useEffect(() => {
    const getSkills = async () => {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        try {
          const response = await axios.get("http://127.0.0.1:8000/api/skills/", config);
          setSkillOptions(response.data);  //Update skillOptions state with fetched skills
        } catch (err) {
          alert(`Error in fetching skills: ${err}`);
        }
      }
    };

    getSkills();
  }, [token]);//  Add token as a dependency

  return (
    <div>
      <h2>{project.title}</h2>
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
                            <td>{skill.skill_info.skill ? skill.skill_info.skill : (
                              <select
                              id='sk'
                                name='skill'
                                value={skill.skill_info.skill}
                                onChange={(e) => handleEditSkill(index, e)}
                              >
                                {skillOptions.map((sk) => <>
                                  <option key={index} value={sk.skill} id={sk.id} name="skill">
                                    {sk.skill}
                                  </option>
                                </>
                                )}
                              </select>
                            )} </td>
                            <td>
                              {isEditing ? (
                                <select
                                name='expertiseLevel'
                                  value={skill.expertiseLevel}
                                  onChange={(e) => handleEditSkill(index, e)}
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
                        
                      </tbody>
                      </table>
                      {isEditing ? (
                        <div className='d-flex justify-content-between'>
                          <button type="button" onClick={handleAddSkills}>
                            add skill
                          </button>
                          <button type="button" onClick={handleSaveSkills}>
                            Save
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setIsEditing(true)}>
                          Edit
                        </button>
                      )}
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
  );
};

export default Admin_Project_view;
