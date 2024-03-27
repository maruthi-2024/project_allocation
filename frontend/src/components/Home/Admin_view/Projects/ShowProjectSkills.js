import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import urls from '../../../Api_Urls';

const ShowSkills = ({  project,skillsHasChanges,setSkillsHasChanges }) => {
  const { token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  const expLevel = {
    BG: 'Beginner',
    IN: 'Intermediate',
    EX: 'Expert',
  };

  useEffect(() => {
    fetchSkillOptions();
    fetchProjectSkills();
  }, []);

  const fetchProjectSkills = async () => {
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
  };

  const fetchSkillOptions = async () => {
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

  const handleSaveSkills = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    
      //  to check employee skills again by updated project skills
      var answer = window.confirm("Are you want to delete Employees who don't have modified skill set? if yes press ok");
      if (answer) {
        const putRequests = skills.map((skill) => axios.put(urls.get_proj_skills + project.id, skill, config));
        await Promise.all(putRequests);
        await axios.get(urls.check_proj_alloc + project.id, config);  
      }
      else {
        const putRequests = skills.map((skill) => axios.put(urls.get_proj_skills + project.id, skill, config));
        await Promise.all(putRequests);
      }
      
      setSkillsHasChanges(!skillsHasChanges);
      setIsEditing(false);
      fetchProjectSkills(); 
    } catch (err) {
      alert(`Error in saving skills: ${err}`);
    }
  };

  const handleEditSkill = (index, field, value) => {
    const editedSkills = [...skills];
    editedSkills[index][field] = value;
    setSkills(editedSkills);
  };

  const handleAddSkill = () => {
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
    !isAccordionOpen && fetchProjectSkills();
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
            <table className="table table-borderless small">
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={index}>
                    <td>
                      {isEditing ? (
                        <select
                          name="skill"
                          value={skill.skill_info.skill}
                          onChange={(e) =>
                            handleEditSkill(index, 'skill_info', {
                              skill: e.target.value,
                              id: e.target.selectedOptions[0].getAttribute('id'),
                            })
                          }
                        >
                          {skillOptions.map((sk) => (
                            <option key={sk.id} value={sk.skill} id={sk.id}>
                              {sk.skill}
                            </option>
                          ))}
                        </select>
                      ) : (
                        skill.skill_info.skill
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          name="expertiseLevel"
                          value={skill.expertiseLevel}
                          onChange={(e) =>
                            handleEditSkill(index, 'expertiseLevel', e.target.value)
                          }
                        >
                          {Object.entries(expLevel).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      ) : (
                        skill.expertise_level
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing ? (
              <div className="d-flex justify-content-between">
                <button type="button" onClick={handleAddSkill}>
                  Add Skill
                </button>
                <button type="button" onClick={handleSaveSkills} >
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
  );
};

export default ShowSkills;
