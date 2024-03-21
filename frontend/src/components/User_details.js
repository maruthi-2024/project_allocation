import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import axios from 'axios';

import urls from './Api_Urls';

import FemaleLogo from '../images/Employee_female.png';
import MaleLogo from '../images/Employee_male.png';
import Locationpng from '../images/location.png';
import Emailpng from '../images/email.png';
import PhoneNumberpng from '../images/phone-number.png';
import Datepng from '../images/Date.png';
import BloodGrppng from '../images/BloodGrp.png';

import "../Css/User_details.css"

const User_details = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([])
  const formatToSimpleDate = (date) =>
    date !== null && date !== undefined ? format(new Date(date), "dd-MM-y") : undefined;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
          console.log(urls.get_skills)
          const res = await axios.get(urls.get_user_skills, config);
          console.log(res.data)
          setSkills(res.data)
        } catch (err) {
          alert(`Error msg in fetching user skills:${err} `);
        }
      }
    }
    !isAccordionOpen && fetchEmployeeSkills();
    setIsAccordionOpen(!isAccordionOpen);
  };


  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user); // Keep track of edited values

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    console.log(editedUser)
    // let names=""
    // e.target.name == "full_name" ? (names=(e.target.value).split(" "),
    // setEditedUser((prevUser) => ({
    //   ...prevUser,  
    //   [ e.target.first_name]:  names[0],
    //   [ e.target.last_name]:  names[1],
    // }))
    // ):(console.log("hey"))
     setEditedUser((prevUser) => ({
      ...prevUser,  
      [ e.target.name]:  e.target.value,
    }));
    console.log(editedUser,"1")
  };

  const handleSave = () => {
    console.log('Saved:', editedUser);
    setIsEditing(false); 
  };






  return (
    <div className="card p-2 mt-3 mx-2 border">
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-primary" onClick={toggleEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </button>
      </div>
      <div className="mx-auto text-center  p-2 border-2 border-bottom border-secondary-subtle" >
        <img src={user.emp_gender === 'Male' ? MaleLogo : FemaleLogo} alt="Profile" width="100" />
        <h3>{isEditing ? <input type="text"  name="full_name" value={`${editedUser.first_name} ${editedUser.last_name}`} onChange={handleChange} /> : `${editedUser.first_name} ${editedUser.last_name}`}</h3>
        <p>{isEditing ? <input type="text" name="emp_designation" value={editedUser.emp_designation} onChange={handleChange} /> : editedUser.emp_designation.designation}</p>
      </div>
      <div className="p-2">
        <table className="table table-borderless small" >
          <tbody>
            <tr>
              <td width="25px"><img width="25px" src={Locationpng} /></td>
              {/* <td><p id="location">{user.contact_address}</p></td> */}
              <td>{isEditing ? <input type="text" name="contact_address" value={editedUser.contact_address} onChange={handleChange} /> : editedUser.contact_address}</td>
            </tr>
            <tr>
              <td width="25px"><img width="25px" src={PhoneNumberpng} /></td>
              <td>{isEditing ? <input type="text" name="phone_number" value={editedUser.phone_number} onChange={handleChange} /> : editedUser.phone_number}</td>
              {/* <td><p id="phonenumber">{user.phone_number}</p></td> */}
            </tr>
            <tr>
              <td width="25px"><img width="25px" src={Emailpng} /></td>
              <td><p id="email">{user.email}</p></td>
            </tr>
            <tr>
              <td width="25px"><img width="25px" src={Datepng} /></td>
              <td><p id="email">{formatToSimpleDate(user.date_joined)}</p></td>
            </tr>
            <tr>
              <td width="25px"><img width="25px" src={BloodGrppng} /></td>
              <td><p id="email">{user.blood_group}</p></td>
            </tr>
          </tbody>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </table>
      

        <div className="accordion accordion-flush col-6" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button ${isAccordionOpen ? '' : 'collapsed'}`}
                type="button"
                onClick={toggleAccordion}
                aria-expanded={isAccordionOpen}
                aria-controls="flush-collapseOne"
              >
                My Skills
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className={`accordion-collapse collapse ${isAccordionOpen ? 'show' : ''}`}
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <table className="table table-borderless small" >
                  {skills && <tbody>
                    {skills.map(skill => <tr key={skill.id}>
                      <td>{skill.skill_info.skill}</td>
                      <td>-</td>
                      <td>{skill.expertise_level}</td>
                    </tr>)}
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>}
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default User_details