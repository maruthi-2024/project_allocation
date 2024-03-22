import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import urls from '../../../Api_Urls';
import axios from 'axios';
const Show_Suggested_employees = ({employeeList}) => {
  const { token } = useSelector((state) => state.auth);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [accordionId, setAccordionId] = useState(0);
  const [skills, setSkills] = useState([])
  // Function to fetch employee skills via API
  const fetchEmployeeSkills = async (employeeId) => {
    try {
      const response = await fetch(`API_URL/employees/${employeeId}/skills`);
      const data = await response.json();
      console.log(data); // Handle the skills data as needed
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };



  // Handler for button click to fetch skills
  const handleSkillsButton = (employeeId) => {
    fetchEmployeeSkills(employeeId);
  };

  const toggleAccordion = (event) => {
    console.log(`${event.target.name}`)
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
                console.log(urls.get_skills)
                const res = await axios.get(urls.get_emp_skills + event.target.id, config);
                console.log(res.data)
                setSkills(res.data)
            } catch (err) {
                alert(`Error msg :${err}`);
            }
        }
    }
    !isAccordionOpen && fetchEmployeeSkills();
    setIsAccordionOpen(!isAccordionOpen);
    setAccordionId(event.target.name)
};
  return (
    <div className='d-flex flex-column align-content-start'>
      <h1>Employee List</h1>
        {employeeList.map((employee) => (
          <div key={employee.id} className='d-flex align-content-center justify-content-between'>
            <div>
            <input
              type="checkbox"
              checked={selectedEmployees.includes(employee.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedEmployees((prevSelected) =>
                  checked
                    ? [...prevSelected, employee.id]
                    : prevSelected.filter((id) => id !== employee.id)
                );
              }}
            />
            <b>Employee </b> - {employee.username} ,
            <b>Designation</b>  - {employee.emp_designation.designation}
             </div>
             <div className="accordion accordion-flush " >
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${isAccordionOpen  && accordionId == employee.id? '' : 'collapsed'} p-0 m-0`}
                                type="button"
                                name={employee.id}
                                id={employee.id}
                                onClick={toggleAccordion}
                                aria-expanded={isAccordionOpen}
                                aria-controls="flush-collapseOne"
                            >
                                Show Skills
                            </button>
                        </h2>
                        <div
                            id="flush-collapseOne"
                            className={`accordion-collapse collapse ${isAccordionOpen  && accordionId == employee.id? 'show' : ''}`}
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                <table className="table table-borderless small">
                                <tbody>
                                    {skills && skills.map((skill, index) => (
                                        <><tr key={skill.id}>
                                            <td>{skill.skill_info.skill}</td>
                                            <td>
                                                {
                                                    skill.expertise_level
                                                }
                                            </td>
                                        </tr></>
                                    )
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        ))}

    </div>
  );
};


export default Show_Suggested_employees;