import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { fetchUser } from '../redux/reducers/authSlice';
import urls from './Api_Urls';
import Employee_details from './Employee_details';
import Projects  from './Projects';



export const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(true);
    async function fetchUserDetails() {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        try {
          const res = await axios.get(urls.get_user, config);
          dispatch(fetchUser(res.data));
        } catch (err) {
          alert(`Error msg :${err}`);
        }
      }
      setLoading(false);
    }

    fetchUserDetails();
  }, [token]);


  if (loading) {
    return <p>Loading...</p>;
  }
  if (token == null) return <Navigate to="/login" />;

  if (user) {
    return (
      <div className="container-fluid full-body">
        <div className="row justify-content-center">
            <div className="col-lg-3 col-md-5 col-sm-6 col-xs-12">
              <Employee_details />
              </div>
              <div className="col">
                <div className="card p-2 mt-3 mx-2  bg-primary ">
                  <Projects/>
                </div>
              </div>
            </div>
          </div>
    );
  }
};

export default Home;
