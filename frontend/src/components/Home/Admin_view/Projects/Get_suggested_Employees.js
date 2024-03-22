import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import urls from '../../../Api_Urls';
import Show_Suggested_employees from './Show_Suggested_employees';

const Get_suggested_Employees = ({project}) => {

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeList,setEmployeeList] =useState([])
  const [displaySuggestions,setdisplaySuggestions] = useState(false)

    const handleSuggestedEmployees = async () =>{
        if (token) {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          };
          try {
            const response = await axios.get(urls.get_suggested_emp + project.id, config);
            setEmployeeList(response.data)
            console.log(response.data)
          } catch (err) {
            alert(`Error in fetching skills: ${err}`);
          }
          setdisplaySuggestions(true)
        }
       
      } 
 if (token == null) return <Navigate to="/login" />;
  return (
    <div className="card p-2 mt-3 mx-2 ">
    <button onClick={handleSuggestedEmployees}>
     suggest employees
    </button>
    {displaySuggestions && <Show_Suggested_employees employeeList = {employeeList}/>}
 </div>
  )
}

export default Get_suggested_Employees;