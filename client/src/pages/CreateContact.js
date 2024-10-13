import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './CreateContact.css';

const CreateContact = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });



  const [error, setError] = useState("");  
  const [success, setSuccess] = useState("");  // To store success messages
  const navigate = useNavigate(); 
  const { user } = useContext(AuthContext);




  
  // Handle input changes and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Basic validation function
  const validateFields = () => {
    if (userDetails.name.length < 4) {
      setError("Name must be at least 4 characters long.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(userDetails.phone)) {
      setError("Phone number must be valid and contain 10-15 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");  // Clear any previous errors
    setSuccess("");  // Clear any previous success messages

    // Validate the form fields
    if (!validateFields()) {
      return;
    }

    try {
      // Log the userDetails before sending the request
      console.log("User Details Being Sent:", userDetails);
      const token = localStorage.getItem("token"); // assuming token is stored in localStorage
      const res = await fetch(`http://localhost:8000/api/contact`, {  
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify(userDetails),
      });

      const result = await res.json();
      
      console.log("API Response:", result);

      if (res.status !== 200) {
        
        // Handle the error based on API response
        if (!result.error) {
          setError(result.error);
        } else {
          setError("An unknown error occurred.");
        }
        return;
      }

      // On successful response, set success message
      console.log("Contact created successfully!", result);
      setSuccess("Contact created successfully!");

    } catch (error) {
      console.error("Failed to submit contact:", error);
      setError("Failed to submit contact. Please try again.");
    }
  };

  return (
    <>
      <h2 className='color-p'>Create Your Contact</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display success message if any */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}> 
        <label htmlFor="nameInput" className="col-sm-2 col-form-label">
          Name of person
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
          />
        </div>

        <label htmlFor="addressInput" className="col-sm-2 col-form-label">
          Address of person
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            required
          />
        </div>

        <label htmlFor="emailInput" className="col-sm-2 col-form-label">
          Email of person
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>

        <label htmlFor="phoneInput" className="col-sm-2 col-form-label">
          Phone Number of person
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <input type="submit" value="Add Contact" className="btn btn-info mt-3" />
      </form>
    </>
  );
};





export default CreateContact;
























// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import './CreateContact.css';

// const CreateContact = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     address: "",
//     email: "",
//     phone: "",
//   });

//   const [error, setError] = useState("");  // To store any error messages
//   const [ success, setSuccess ] = useState();
//   const navigate = useNavigate(); 
//   const { user } = useContext(AuthContext);

//   // Handle input changes and update state
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserDetails({ ...userDetails, [name]: value });
//   };

//   // Basic validation function
//   const validateFields = () => {
//     if (userDetails.name.length < 4) {
//       setError("Name must be at least 4 characters long.");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
//       setError("Please enter a valid email address.");
//       return false;
//     }
//     if (!/^[0-9]{10,15}$/.test(userDetails.phone)) {
//       setError("Phone number must be valid and contain 10-15 digits.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");  // Clear any previous errors
//     setSuccess("");

//     // Validate the form fields
//     if (!validateFields()) {
//       return;
//     }

//     try {
//       // Log the userDetails before sending the request
//       console.log("User Details Being Sent:", userDetails);

//       const res = await fetch(`http://localhost:8000/api/contact`, {  
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(userDetails),
//       });

//       const result = await res.json();
//       console.log("API Response:", result);

//       if (res.status !== 200) {
//         // Handle the error based on API response
//         if (result.error) {
//           setError(result.error);
//         } else {
//           setError("An unknown error occurred.");
//         }
//         return;
//       }

//       // On successful response, redirect or show a success message
//       console.log("Contact created successfully!", result);
//       setSuccess("Contact created successfully!");

//     } catch (error) {
//       console.error("Failed to submit contact:", error);
//       setError("Failed to submit contact. Please try again.");
//     }
//   };

//   return (
//     <>
//       <h2 className='color-p'>Create Your Contact</h2>

//       {/* Display error message if any */}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}> 
//         <label htmlFor="nameInput" className="col-sm-2 col-form-label">
//           Name of person
//         </label>
//         <div className="col-sm-10">
//           <input
//             type="text"
//             className="form-control"
//             id="nameInput"
//             name="name"
//             value={userDetails.name}
//             onChange={handleInputChange}
//             placeholder="Enter name"
//             required
//           />
//         </div>

//         <label htmlFor="addressInput" className="col-sm-2 col-form-label">
//           Address of person
//         </label>
//         <div className="col-sm-10">
//           <input
//             type="text"
//             className="form-control"
//             id="addressInput"
//             name="address"
//             value={userDetails.address}
//             onChange={handleInputChange}
//             placeholder="Enter address"
//             required
//           />
//         </div>

//         <label htmlFor="emailInput" className="col-sm-2 col-form-label">
//           Email of person
//         </label>
//         <div className="col-sm-10">
//           <input
//             type="email"
//             className="form-control"
//             id="emailInput"
//             name="email"
//             value={userDetails.email}
//             onChange={handleInputChange}
//             placeholder="Enter email"
//             required
//           />
//         </div>

//         <label htmlFor="phoneInput" className="col-sm-2 col-form-label">
//           Phone Number of person
//         </label>
//         <div className="col-sm-10">
//           <input
//             type="tel"
//             className="form-control"
//             id="phoneInput"
//             name="phone"
//             value={userDetails.phone}
//             onChange={handleInputChange}
//             placeholder="Enter phone number"
//             required
//           />
//         </div>

//         <input type="submit" value="Add Contact" className="btn btn-info mt-3" />
//       </form>
//     </>
//   );
// };

// export default CreateContact;


























// import React, { useContext, useEffect, useState } from 'react'

// import'./CreateContact.css'
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const CreateContact = () => {

//     const [ userDetails, setUserDetails ] =  useState({
//       name: "",
//       address: "",
//       email: "",
//       phone:"",
//     });
    
//     const navigate = useNavigate(); 
   
//     const { user } = useContext(AuthContext);

//     const handleInputChange = (event) => {
//       const {name, value} = event.target;

//       setUserDetails({ ...userDetails, [name]: value });
//     }

//       const handleSubmit = async (event) => {
//         event.preventDefault();

       

        
        
//         const res = await fetch(`http://localhost:8000/api/contact`, {  
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(userDetails),
//         });
//             const result = await res.json();
//             if (!result.error) {
//               console.log(result);

//            }else{
//                 console.log(result);
//             }

          
            
//       };



//   return (
//   <>

//   <h2 className='color-p'>Create Your Contact</h2>

//   <form onSubmit={handleSubmit}> 

//          <label htmlFor="nameInput" 
//          className="col-sm-2 col-form-label"
//          >Name of person
//          </label>
//          <div class="col-sm-10">
//      <input type="text" 
//      className="form-control"
//       id="staticPassword" 
//       aria-describedby="passwordHelp" 
//       name="name"
//       value={userDetails.name}
//       onChange={handleInputChange}
//       placeholder="Enter name"
//       required 
//       >
        
      
//     </input>
// </div>


// <label htmlFor="addressInput" 
//          className="col-sm-2 col-form-label"
//          >Adress of person
//          </label>
//          <div class="col-sm-10">
//      <input type="text" 
//      className="form-control"
//       id="addressInput" 
    
//       name="address"
//       value={userDetails.address}
//       onChange={handleInputChange}
//       placeholder="Enter address"
//       required 
//       >
        
      
//     </input>
// </div>





// <label htmlFor="emaiInput" 
//          className="col-sm-2 col-form-label"
//          >email of person
//          </label>
//          <div class="col-sm-10">
//      <input type="email" 
//      className="form-control"
//       id="emailInput" 
    
//       name="email"
//       value={userDetails.email}
//       onChange={handleInputChange}
//       placeholder="Enter mail"
//       required 
//       >
        
      
//     </input>
// </div>




// <label htmlFor="phoneInput" 
//          className="col-sm-2 col-form-label"
//          >Phone Number of person
//          </label>
//          <div class="col-sm-10">
//      <input type="number" 
//      className="form-control"
//       id="phoneInput" 
    
//       name="phone"
//       value={userDetails.phone}
//       onChange={handleInputChange}
//       placeholder="Enter number"
//       required 
//       >
        
      
//     </input>
// </div>
// <input type="submit" value="Add Contact" className="btn btn-info mt-3" />



//   </form>
//   </>
//   )
// }

// export default CreateContact;








