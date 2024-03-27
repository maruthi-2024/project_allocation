import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import urls from '../../../Api_Urls';


const ShowEmployeeSkills = ({skills,setSkills,user}) => {
    const { token } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [skillOptions, setSkillOptions] = useState([]); 
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const expLevel = {
        "BG": "Beginner",
        "IN": "Intermediate",
        "EX": "Expert"
    }

    const fetchEmployeeSkills=async () =>{
        if (token) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            };

            try {
                console.log(urls.get_skills)
                const res = await axios.get(urls.get_emp_skills + user.id, config);
                console.log(res.data)
                setSkills(res.data)
            } catch (err) {
                alert(`Error msg :${err}`);
            }
        }
      }
  useEffect(() => {
    const getSkillOptions = async () => {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        try {
          const response = await axios.get(urls.get_skills, config);
          setSkillOptions(response.data);  
        } catch (err) {
          alert(`Error in fetching skills: ${err}`);
        }
      }
    };
    getSkillOptions();
  }, []);
 
    const handleSaveSkills = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            skills.map(async skill => { await axios.put(urls.get_emp_skills + user.id, skill, config) })
            setIsEditing(false)
        } catch (err) {
            alert(`Error saving skills: ${err}`);
        }
      };
    
      const handleEditSkill = (index, event) => {
        const { name, value,id } = event.target;
        const edited = [...skills];
        if (name === "skill") {
              let id = ''; 
              if (event.target.selectedOptions) {
                  id = event.target.selectedOptions[0].getAttribute('id'); 
                }
              edited[index].skill_info.skill = value;
              edited[index].skill_info.id = id;
              edited[index].skill = id
        } else {
          edited[index].expertiseLevel = value;
          edited[index].expertise_level = expLevel[value];
        }
        setSkills(edited);
      };
    const handleAddSkills = () => {
        // initializing the new skill
        setSkills([
          ...skills,
          {
            employee: user.id,
            skill_info: { skill: '', id: null },
            expertiseLevel: 'BG',
            expertise_level: 'Beginner',
          },
        ]);
    
      };
    const toggleAccordion = () => {
        !isAccordionOpen && fetchEmployeeSkills();
        setIsAccordionOpen(!isAccordionOpen);
      };
  return (
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
          skills
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
  )
}

export default ShowEmployeeSkills;