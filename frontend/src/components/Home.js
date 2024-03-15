import React from 'react'
import {useSelector} from "react-redux"

import Login from './Login'
import urls from './Api_Urls'
import axios from 'axios'
import { useDispatch } from "react-redux";
export default function Home() {
  let dispatch = useDispatch();
  const login = useSelector(state => state)
  const submitHandler= () =>{
    const api=urls.logout
    const user = axios.delete(api)
    dispatch({ 
      type: "LOGOUT", 
      payload: {}
  });
  }
  return (
   
    <div>Home
      <button onClick={submitHandler}>logout</button>
         {console.log(login)}
    </div>
  )
}
