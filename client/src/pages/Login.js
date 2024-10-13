import React, { useContext } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';

function Login() {

    const { loginUser } = useContext(AuthContext);


  const [credentials, setCredentials] = useState({
    email:"",
    password:"",
  });

  const handleInputChange = (event) => {
    const{name, value} = event.target;
    setCredentials({...credentials, [name]: value })
  }
//page is not refresh
  const handleSubmit = (event) => {
    event.preventDefault();

    if(!credentials.email || !credentials.password) {
      toast.error("please enter all the required fields!")
      return;
    }


    loginUser(credentials);

  };

  return ( 
    <div>
      <ToastContainer autoClose={2000} />
  <h1 className='header'>Login</h1>


  <form onSubmit={handleSubmit}>
    

      <div>
         <label htmlfor="staticEmail" 
         className="col-sm-2 col-form-label"
         >Email address
         </label>
         <div class="col-sm-10">
     <input type="email" 
     className="form-control-plaintext"
      id="staticEmail" 
      aria-describedby="emailHelp" 
      name='email'
      value={credentials.email}
      onChange={handleInputChange}
      placeholder="Enter email" 
      required
      >
        
      
       </input>
       </div>
    </div>

    <div>
         <label htmlfor="staticPassword" 
         className="col-sm-2 col-form-label"
         >Password
         </label>
         <div class="col-sm-10">
     <input type="password" 
     className="form-control-plaintext"
      id="staticPassword" 
      aria-describedby="passwordHelp" 
      name="password"
      value={credentials.password}
      onChange={handleInputChange}
      placeholder="Enter password"
      required 
      >
        
      
       </input>
       </div>
    </div>
   
    <input type='submit' value="Login" className='btn btn-primary my-3' ></input>
    <p className='header'>Don't have an account ? <Link to="/register">Create One</Link></p> 
  </form>
  </div>
  

  );
};

export default Login;






