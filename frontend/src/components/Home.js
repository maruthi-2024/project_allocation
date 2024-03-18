import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, logoutUser } from '../reducers/authSlice';
import urls from './Api_Urls';
import axios from 'axios';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.auth);




  useEffect(() => {
    setLoading(true)

    async function fetchUserDetails() {
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        };
  
        try {
          const res = await axios.get(urls.get_user, config);
          dispatch(fetchUser(res.data));
        } catch (err) {
          alert(err)
        }
      }
      setLoading(false)
    }
    
    fetchUserDetails()
  }, [])


  const submitHandler = () => {
    dispatch(logoutUser())
  }
  // if (!isAuthenticated) {
  //   return <Navigate to='/login' />
  // }

  if (loading) {
    return <p>Loading...</p>
  }


  if (user) {
    return (
      <div>
        Home
        {user.username}
        <button onClick={submitHandler}>logout</button>
      </div>
    )

  }

}

export default Home;