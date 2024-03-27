import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import urls from '../../../Api_Urls';

const Display_Employees_In_Project = ({ project, skillsHasChanges, suggEmpHasChanges }) => {
  const { token } = useSelector((state) => state.auth);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        try {
          const res = await axios.get(urls.get_emps_in_proj + project.id, config);
          setEmployees(res.data);
        } catch (err) {
          alert(`Error while fetching employees in the project: ${err}`);
        }
      }
    };

    fetchEmployees();
  }, [token, project.id, skillsHasChanges, suggEmpHasChanges]);

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title'>Employees in Project</h5>
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table table-bordered table-hover'>
            <thead className='thead-light'>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  {console.log(employee,employee.joined_date)}
                  <td>{new Date(employee.date_joined).toLocaleDateString()}</td>
                  <td>{employee.emp_designation.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Display_Employees_In_Project;
