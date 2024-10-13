
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);  // Add success state
    const navigate = useNavigate();
    // Login request
    const loginUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:8000/api/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData }),
            });

            const user = await res.json();
          
            if (res.ok) {
                setUser(user);   // Set the user state on successful login
                setError(null);  // Clear any previous error
                setSuccess("Logged in successfully!"); // Set success message
                
                navigate('/home');

            } else {
                setError(user.error);  // Handle error from login
                setSuccess(null);      // Clear success message in case of error
            }
        } catch (err) {
            console.log(err);
            setError("An error occurred during login.");  // Generic error message
            setSuccess(null);                             // Clear success message
        }
    };

    // Register request
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:8000/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await res.json();
            if (res.ok) {
                console.log(result);
                return result;  // Return the successful response
            } else {
                return { error: result.error || "Registration failed." };  // Return error
            }
        } catch (err) {
            console.log(err);
            return { error: "An error occurred during registration." };  // Return generic error
        }
    };

    return (
        <AuthContext.Provider value={{ loginUser, registerUser, setUser, user, error, success }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;























