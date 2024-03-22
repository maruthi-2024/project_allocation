import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import urls from '../../../Api_Urls';
import Employee_Card from './Employee_Card';
import { Navigate } from 'react-router-dom';

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([])
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    async function fetchAllEmployees() {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        };

        try {
          const res = await axios.get(urls.get_all_emp, config);
          console.log(res.data)
          setEmployees(res.data)
        } catch (err) {
          alert(`Error msg :${err}`);
        }
      }
    }

    fetchAllEmployees();
  }, [])

  if (token == null) return <Navigate to="/login" />;
  return (
    <div className="container">
      <div className="row">
        {
          employees.map(emp => !emp.is_superuser && <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
            <Employee_Card user={emp} />
          </div> )
        }
      </div>
    </div>
  )
}

export default ViewAllEmployees;