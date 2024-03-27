import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import axios from 'axios';

import urls from '../../../Api_Urls';
import FemaleLogo from '../../../../images/Employee_female.png';
import MaleLogo from '../../../../images/Employee_male.png';
import ShowEmployeeSkills from './showEmploeeSkills';

export const Employee_Card = ({ user }) => {
    const { token } = useSelector((state) => state.auth);
    const [skills, setSkills] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const expLevel={"BG":"Beginner",
    "IN":"Intermediate","EX":"Expert"
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
            skills.map(async skill => { await axios.put(urls.get_emp_skills + user.id, skill, config) })
            setIsEditing(false)
        } catch (err) {
            alert(`Error saving skills: ${err}`);
        }
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
                    const res = await axios.get(urls.get_emp_skills + user.id, config);
                    console.log(res.data)
                    setSkills(res.data)
                } catch (err) {
                    alert(`Error msg :${err}`);
                }
            }
        }
        !isAccordionOpen && fetchEmployeeSkills();
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div className="card p-2 mt-3 mx-2 border">
            <div className="mx-auto text-center  p-2 " >
                <img id="profile_pic" src={user.emp_gender == "Male" ? MaleLogo : FemaleLogo} width="45%" />
                <div className='d-flex flex-column justify-content-center'>
                    <p>Name : <span className="pt-3" id="profile-name"> {`${user.first_name} ${user.last_name}`}</span></p>
                    <p id="designation">Designation :  {user.emp_designation ? user.emp_designation.designation : null}</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <ShowEmployeeSkills skills={skills} setSkills={setSkills} user={user}/>
                {/* <div className="accordion accordion-flush col-6" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button
                                className={`accordion-button ${isAccordionOpen ? '' : 'collapsed'}`}
                                type="button"
                                name={user.id}
                                onClick={toggleAccordion}
                                aria-expanded={isAccordionOpen}
                                aria-controls="flush-collapseOne"
                            >
                                Show Skills
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
                </div> */}

            </div>
        </div>
    )
}

export default Employee_Card;
