import React, { useContext, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext'; 

function Register() {
    const { registerUser } = useContext(AuthContext); // Access the registerUser function from context
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
            toast.error("Please enter all the required fields!");
            return;
        }

        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Call the registerUser function from AuthContext
        const result = await registerUser({ 
            name: credentials.name,
            email: credentials.email, 
            password: credentials.password,
        });

        if (result.error) {
            toast.error(result.error); 
        } else {
            toast.success("Registration successful!"); 
        }
    };

    return (
        <>
            <ToastContainer autoClose={2000} />

            <div>
                <h1 className='header'>CREATE YOUR ACCOUNT</h1>
            </div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="nameInput" className="col-sm-2 col-form-label">
                       Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control-plaintext"
                            id="nameInput"
                            name="name"
                            value={credentials.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="emailInput" className="col-sm-2 col-form-label">
                        Email address
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control-plaintext"
                            id="emailInput"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="passwordInput" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control-plaintext"
                            id="passwordInput"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPasswordInput" className="col-sm-2 col-form-label">
                        Confirm Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control-plaintext"
                            id="confirmPasswordInput"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>
                </div>

                <input type='submit' value="Register" className='btn btn-primary my-3' />
                <p className='header'>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    );
}

export default Register;
























