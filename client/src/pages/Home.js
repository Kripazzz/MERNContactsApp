import React, { useContext, useEffect } from 'react';

import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);



  useEffect(() => {
    console.log("User:" , user);
    if(!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);




  return(
  <>
  <div className="jumbotron">
  <h1 className="display-4">Welcome Guest {user ? user.name : 'Guest' }</h1>
  
  <p className="lead">
    <a className="btn btn-info" href="/" role="button">ADD ContactS</a>
  </p>
</div>
</>
  )

}

export default Home;