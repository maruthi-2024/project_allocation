import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import urls from './Api_Urls';

const Projects = () => {
    const { token, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [projs,setProjs]=useState([])
    
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
                const res = await axios.get(urls.get_projs, config);
                setProjs(res.data)
                // dispatch(fetchUser(res.data));
              } catch (err) {
                alert(`Error msg :${err}`);
              }
            }
            setLoading(false);
          }
          fetchprojects()
    },[])

    if (loading) {
        return <p>Loading...</p>;
      }
      if (token == null) return <Navigate to="/login" />;
      if(user){
        if(projs.length ==0){
            return <h1>Your not assigned to any project ...</h1>
        }
        
        return (
            <div>
               <h1>Projects</h1>
                <div className="d-flex flex-column">
                    {projs.map(project => (
                    <div className="m-3" key={project.id}>
                        <div className="flex card">
                            <div className="card-header">
                                    <span className='h3 text-primary'>{project.title}</span>
                                    <span className='d-flex justify-content-end text-primary'>
                                        {project.starting_date} to  {project.deadline}
                                    </span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-info">Project Lead : {project.lead}</h5>
                                <p className="card-text"> {project.description}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
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
