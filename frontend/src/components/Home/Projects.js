import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import urls from '../Api_Urls';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import PlusButton from "../../images/plusbutton.jpeg"
const Projects = () => {
    const { token, user,is_user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [projs,setProjs]=useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchprojects() {
            if (token) {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                },
              };
      
              try {
                const res = await axios.get(urls.get_user_projs, config);
                setProjs(res.data)
              } catch (err) {
                alert(`Error msg in fetching projects:${err}`);
              }
            }
            setLoading(false);
          }
          fetchprojects()
    },[])

    const projectHandler=(key) => {
      !is_user && navigate('/proj', { state: {project : {...key}} });
    }

    const projectaddhandler=()=>{
      navigate("/add_proj")
    }

    if (loading) {
        return <p>Loading...</p>;
      }
      if (token == null) return <Navigate to="/login" />;
      if(user){
        if(projs.length ==0){
            return <>
            <h1>Your not assigned to any project ...</h1>
             {!is_user  && <p className='btn d-flex justify-content-end h1 text-info' onClick={projectaddhandler}>Add project</p>}
            </>
        }
        return (
            <div>
               <h1>Projects</h1>
               <p className='btn d-flex justify-content-end h1 text-info' onClick={projectaddhandler}>Add project</p>
                <div className="d-flex flex-column">
                    {projs.map(project => (
                    <div className="m-3 bg-info" key={project.id} onClick={() => projectHandler(project)} >
                        <div className="flex card">
                            <div className="card-header">
                                    <span className='h3 text-primary'>{project.title}</span>
                                    <span className='d-flex justify-content-end text-primary'>
                                        {project.starting_date} to  {project.deadline}
                                    </span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-info">Project Lead : {project.project_lead? project.project_lead.username:null}</h5>
                                <p className="card-text"> {project.description}</p>
                            </div>
                        </div>    
                    </div>
                    ))}
                </div>
            </div>
          )
      }
  
}

export default Projects;
